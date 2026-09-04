// Ensures Git LFS-tracked media (public/media/**/*.mp4) are real files in the
// working tree before `next build`. Without this, CI environments that clone
// without LFS smudge (e.g. Vercel) ship ~130-byte LFS pointer text files with
// a video/mp4 content type — videos render as empty players on production.
//
// Strategy:
//   1. Scan public/ for pointer files (cheap, no git-lfs needed).
//   2. If any, try `git lfs pull` with a hard timeout (git-lfs can hang on
//      auth/quota problems in CI).
//   3. Still pointers → pure-Node download via the GitHub LFS Batch API
//      (no git-lfs binary needed; no auth for a public repo — set GITHUB_TOKEN
//      for private repos).
import { execSync } from "node:child_process";
import { createWriteStream, readdirSync, readFileSync, renameSync, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const POINTER_PREFIX = "version https://git-lfs";
const BATCH_CHUNK = 50;
const GIT_LFS_TIMEOUT_MS = 180_000;

function sh(cmd, timeoutMs = 15_000) {
  return execSync(cmd, {
    stdio: ["ignore", "pipe", "pipe"],
    timeout: timeoutMs,
  }).toString().trim();
}

function isGitRepo() {
  try {
    return sh("git rev-parse --is-inside-work-tree") === "true";
  } catch {
    return false;
  }
}

function repoSlugFromRemote() {
  try {
    const url = sh("git remote get-url origin");
    const m = url.match(/github\.com[/:](.+?)(?:\.git)?$/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

async function readPointer(file) {
  // Detect LFS pointer files by their first line — cheap and reliable.
  let fh;
  try {
    fh = await import("node:fs/promises").then((m) => m.open(file, "r"));
  } catch {
    return null;
  }
  try {
    const { buffer, bytesRead } = await fh.read(Buffer.alloc(64), 0, 64, 0);
    if (!buffer.subarray(0, bytesRead).toString().startsWith(POINTER_PREFIX)) return null;
  } finally {
    await fh.close();
  }
  const text = readFileSync(file, "utf8");
  const oid = text.match(/oid sha256:([0-9a-f]{64})/)?.[1];
  const size = Number(text.match(/size (\d+)/)?.[1] ?? 0);
  if (!oid) return null;
  return { file, oid, size };
}

async function findPointers() {
  const pointers = [];
  for (const file of walk("public")) {
    const p = await readPointer(file);
    if (p) pointers.push(p);
  }
  return pointers;
}

async function downloadViaBatchApi(pointers) {
  const slug = repoSlugFromRemote();
  if (!slug) throw new Error("cannot derive GitHub repo slug from origin remote");
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
  const headers = {
    Accept: "application/vnd.git-lfs+json",
    "Content-Type": "application/vnd.git-lfs+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let downloaded = 0;
  for (let i = 0; i < pointers.length; i += BATCH_CHUNK) {
    const chunk = pointers.slice(i, i + BATCH_CHUNK);
    const res = await fetch(`https://github.com/${slug}.git/info/lfs/objects/batch`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        operation: "download",
        transfer: ["basic"],
        objects: chunk.map((p) => ({ oid: p.oid, size: p.size })),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`LFS batch API ${res.status} ${res.statusText} ${body.slice(0, 300)}`);
    }
    const { objects = [] } = await res.json();

    await Promise.all(
      objects.map(async (obj, j) => {
        const href = obj.actions?.download?.href;
        if (!href || obj.error) {
          console.warn(`pull-lfs: no download href for ${chunk[j]?.file} (${obj.error?.message ?? obj.error?.code ?? "unknown"})`);
          return;
        }
        const target = chunk[j].file;
        const tmp = `${target}.lfs-partial`;
        const fileRes = await fetch(href);
        if (!fileRes.ok || !fileRes.body) {
          throw new Error(`download ${target}: ${fileRes.status} ${fileRes.statusText}`);
        }
        await pipeline(Readable.fromWeb(fileRes.body), createWriteStream(tmp));
        renameSync(tmp, target);
        downloaded += 1;
        process.stdout.write(`pull-lfs: fetched ${path.relative(process.cwd(), target)} (${Math.round((statSync(target).size || 0) / 1024)} KB)\n`);
      })
    );
  }
  return downloaded;
}

async function main() {
  if (!isGitRepo()) {
    console.log("pull-lfs: not a git work tree, skipping");
    return;
  }

  let pointers = await findPointers();
  if (pointers.length === 0) {
    console.log("pull-lfs: all LFS files present");
    return;
  }

  console.log(`pull-lfs: ${pointers.length} pointer file(s) found — trying git lfs pull...`);
  try {
    sh("git lfs install", 10_000);
    sh("git lfs pull", GIT_LFS_TIMEOUT_MS);
  } catch (err) {
    console.warn(`pull-lfs: git lfs unavailable or failed (${String(err.message).split("\n")[0]}) — falling back to LFS Batch API`);
  }

  pointers = await findPointers();
  if (pointers.length === 0) {
    console.log("pull-lfs: git lfs pull resolved all files");
    return;
  }

  console.log(`pull-lfs: resolving ${pointers.length} pointer file(s) via Batch API...`);
  const downloaded = await downloadViaBatchApi(pointers);
  console.log(`pull-lfs: downloaded ${downloaded}/${pointers.length} file(s)`);

  // Fail loudly if pointers remain — empty videos in production are worse
  // than a failed deploy.
  const stillPointer = [];
  for (const p of pointers) {
    const check = await readPointer(p.file);
    if (check) stillPointer.push(p.file);
  }
  if (stillPointer.length > 0) {
    throw new Error(`${stillPointer.length} LFS file(s) still unresolved: ${stillPointer.slice(0, 3).join(", ")}`);
  }
}

main().catch((err) => {
  // Pointers left in the tree break videos silently — surface it, but let the
  // deploy decision stay explicit: fail the build so it's visible immediately.
  console.error(`pull-lfs: FAILED — ${String(err.message).split("\n")[0]}`);
  console.error("pull-lfs: videos/media on this deployment would be broken; failing the build.");
  process.exit(1);
});
