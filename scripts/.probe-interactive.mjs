import { pathToFileURL } from "node:url";
import path from "node:path";
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (err?.code === "ERR_MODULE_NOT_FOUND" && /^\.{1,2}\//.test(specifier)) {
        for (const suffix of [".ts", "/index.ts", ".tsx"]) {
          try {
            return nextResolve(specifier + suffix, context);
          } catch {
            /* next candidate */
          }
        }
      }
      throw err;
    }
  },
});

// The registry imports `../itCases` without an extension, which only resolves
// once the concrete `.ts` files are already in the module map — the same order
// `package4-media-check.mjs` relies on.
await import(pathToFileURL(path.join(process.cwd(), "data/itCases.ts")).href);
await import(pathToFileURL(path.join(process.cwd(), "data/designCases.ts")).href);
await import(pathToFileURL(path.join(process.cwd(), "data/videoCases.ts")).href);
const registry = await import(pathToFileURL(path.join(process.cwd(), "data/case-records/index.ts")).href);
const R = registry.caseRecords;
const pick = (p) => R.filter(p).map((x) => x.id);
const withAudio = R.filter((x) => JSON.stringify(x).includes('"kind": "audio"')).map((x) => x.id);
const withVideo = R.filter((x) => JSON.stringify(x).includes('"kind": "video"')).map((x) => x.id);
console.log("total", R.length);
console.log("audio:", withAudio.join(" "));
console.log("video:", withVideo.length, withVideo.slice(0, 12).join(" "));
console.log("reviews=1:", pick((x) => x.reviews?.length === 1).length);
console.log("reviews>1:", pick((x) => x.reviews?.length > 1).map((x) => `${x.id}(${x.reviews.length})`).join(" "));
console.log("videoGrid:", pick((x) => x.videoGrid?.length).map((x) => `${x.id}(${x.videoGrid.length})`).join(" "));
console.log("scenes:", pick((x) => x.scenes?.length).join(" "));
console.log("galleryGroups:", pick((x) => x.galleryGroups?.length).map((x) => `${x.id}(${x.galleryGroups.length})`).join(" "));
console.log("gallery:", pick((x) => x.gallery?.length).length);
console.log("compare:", pick((x) => x.compare?.length).map((x) => `${x.id}(${x.compare.length})`).join(" "));
console.log("featureSlider:", pick((x) => x.features?.some((f) => f.slider)).join(" "));
console.log("features:", pick((x) => x.features?.length).length);
console.log("heroVideo:", pick((x) => x.hero?.kind === "video").map((x) => `${x.id}${x.hero.fullSrc ? "(lazy)" : ""}`).join(" "));
console.log("proseImages:", pick((x) => JSON.stringify(x.prose ?? "").includes("image") || (x.prose && JSON.stringify(x.prose).includes("src"))).length);
