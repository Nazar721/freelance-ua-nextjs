// Run after LFS download and before Next builds. Only dimensions enter server code.
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { measureImageBuffer } from "./lib/urlchecks.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDir = path.join(root, "public");
const images = {};
async function scan(dir) {
  const entries = (await readdir(dir, { withFileTypes: true }))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await scan(file);
    else if (entry.isFile() && /\.(png|jpe?g|webp|gif)$/i.test(entry.name)) {
      const buffer = await readFile(file);
      if (buffer.subarray(0, 42).toString().startsWith("version https://git-lfs.github.com/spec/v1")) {
        throw new Error(`LFS image not downloaded: ${path.relative(root, file)}`);
      }
      const measured = measureImageBuffer(buffer);
      if (measured) images[`/${path.relative(publicDir, file).split(path.sep).join("/")}`] = measured;
    }
  }
}
await scan(publicDir);
const out = path.join(root, "lib/generated/image-measurements.json");
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(Object.fromEntries(Object.entries(images).sort(([a], [b]) => a.localeCompare(b, "en"))), null, 2) + "\n");
console.log(`Image measurements: ${Object.keys(images).length} images; no media bundled for SEO`);
