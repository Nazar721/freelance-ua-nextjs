// Ensures Git LFS-tracked media (public/media/**/*.mp4) are real files in the
// working tree before `next build`. Without this, CI environments that clone
// without LFS smudge (e.g. Vercel) ship ~130-byte LFS pointer text files with
// a video/mp4 content type — videos render as empty players on production.
import { execSync } from "node:child_process";

function run(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
}

try {
  const inGitRepo = run("git rev-parse --is-inside-work-tree") === "true";
  if (!inGitRepo) throw new Error("not a git work tree");

  // LFS objects may already be present (smudged during clone) — check cheaply.
  const tracked = run("git lfs ls-files").split("\n").filter(Boolean).length;
  if (tracked === 0) {
    console.log("pull-lfs: no LFS-tracked files, skipping");
    process.exit(0);
  }

  console.log(`pull-lfs: pulling ${tracked} LFS files...`);
  run("git lfs install");
  run("git lfs pull");
  console.log("pull-lfs: done");
} catch (err) {
  // Never break the build over LFS (git-lfs missing, no network, quota...).
  // The app's video/audio error fallbacks cover this case in the UI.
  console.warn(`pull-lfs: skipped (${err.message?.split("\n")[0] ?? err})`);
}
