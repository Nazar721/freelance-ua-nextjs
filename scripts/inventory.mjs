// Package 1 inventory generator v2.
//
// v2 adds, on top of v1:
//   - structured parse of top-level `const NAME = [ ... ]` arrays in case pages:
//     block kind, item order, per-item media + captions (titleKey/captionKey/alt/
//     label/duration), nested `images:` lists, `link:` targets;
//   - external links from three sources (JSX href=, array link:, i18n URL values);
//   - a media-reuse map (which case/block/role uses each file);
//   - needsManualReview flags when parsing is incomplete (never silently drop);
//   - cardStyle fields (glow/fit/objectPosition/hoverImage) kept from data files;
//   - expectations.json for scripts/check-urls.mjs (status/canonical/lang/title/
//     hreflang/redirect targets per URL, with phase current|target).
//
// Read-only: writes reports to docs/package-1/.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { registerHooks } from "node:module";

// App code uses extensionless relative imports (bundler resolution). Node's
// own ESM resolver wants a complete path, so scripts that import app modules
// register a tiny hook that retries `./foo` as `./foo.ts` / `./foo/index.ts`.
// It only affects this process — nothing in the app changes.
try {
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
              /* try the next candidate */
            }
          }
        }
        throw err;
      }
    },
  });
} catch {
  /* Node without synchronous hooks falls back to its default resolution. */
}

const ROOT = process.cwd();
const OUT = path.join(ROOT, "docs", "package-1");
fs.mkdirSync(OUT, { recursive: true });
const BASE = "https://freelance-ua.agency";

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p) => fs.existsSync(path.isAbsolute(p) ? p : path.join(ROOT, p));

/* ───────────────────────── i18n ───────────────────────── */

const i18n = read("lib/i18n.ts");
const ukStart = i18n.indexOf("uk: {");
const enStart = i18n.indexOf("en: {");
const KEY_RE = /^\s{4}"((?:[^"\\]|\\.)*)":/gm;
const keysOf = (s) => {
  const out = new Set();
  let m;
  const re = new RegExp(KEY_RE.source, "gm");
  while ((m = re.exec(s))) out.add(m[1].replace(/\\"/g, '"'));
  return out;
};
const ukKeys = keysOf(i18n.slice(ukStart, enStart));
const enKeys = keysOf(i18n.slice(enStart));

// Value map for the UK locale (used to resolve captions/alts and find URL values).
const ukValues = {};
{
  const seg = i18n.slice(ukStart, enStart);
  const re = /^\s{4}"((?:[^"\\]|\\.)*)":\s*("(?:[^"\\]|\\.)*")/gm;
  let m;
  while ((m = re.exec(seg))) {
    try {
      ukValues[m[1].replace(/\\"/g, '"')] = JSON.parse(m[2]);
    } catch {
      /* leave unresolved rather than crash */
    }
  }
}
const enValues = {};
{
  const seg = i18n.slice(enStart);
  const re = /^\s{4}"((?:[^"\\]|\\.)*)":\s*("(?:[^"\\]|\\.)*")/gm;
  let m;
  while ((m = re.exec(seg))) {
    try {
      enValues[m[1].replace(/\\"/g, '"')] = JSON.parse(m[2]);
    } catch {
      /* ignore */
    }
  }
}
const isUrlValue = (v) => typeof v === "string" && /^https?:\/\//.test(v);

/* ───────────────────── data files (cards) ───────────────────── */

function parseEntries(file, kind) {
  const src = read(file);
  const out = [];
  const re = /\{\s*\n([\s\S]*?)\n  \}/g;
  let m;
  while ((m = re.exec(src))) {
    const body = m[1];
    const slug = body.match(/slug:\s*"([^"]+)"/)?.[1];
    if (!slug) continue;
    const entry = { slug, kind };
    entry.href = body.match(/href:\s*"([^"]+)"/)?.[1] ?? null;
    entry.subcategory =
      body.match(/itCategory:\s*"([^"]+)"/)?.[1] ??
      body.match(/(?<!\w)category:\s*"([^"]+)"/)?.[1] ??
      body.match(/subCategory:\s*"([^"]+)"/)?.[1] ?? null;
    entry.titleKey = body.match(/titleKey:\s*"([^"]+)"/)?.[1] ?? null;
    entry.descriptionKey = body.match(/descriptionKey:\s*"([^"]+)"/)?.[1] ?? null;
    entry.categoryKey = body.match(/categoryKey:\s*"([^"]+)"/)?.[1] ?? null;
    // Card presentation style — must survive into the new registry.
    entry.cardStyle = {
      glowColor: body.match(/glowColor:\s*"([^"]+)"/)?.[1] ?? null,
      glowColorStrong: body.match(/glowColorStrong:\s*"([^"]+)"/)?.[1] ?? null,
      imageFit: body.match(/imageFit:\s*"([^"]+)"/)?.[1] ?? null,
      objectPosition: body.match(/objectPosition:\s*"([^"]+)"/)?.[1] ?? null,
      hoverImage: body.match(/hoverImage:\s*"([^"]+)"/)?.[1] ?? null,
      badge: body.match(/badge:\s*\{[^}]*text:\s*"([^"]+)"/)?.[1] ?? null,
      hideCta: /hideCta:\s*true/.test(body),
    };
    // Card media + video metadata from data files.
    entry.cardMedia = {
      image: body.match(/(?<!hover)image:\s*"([^"]+)"/)?.[1] ?? null,
      galleryImages: [...(body.match(/galleryImages:\s*\[([\s\S]*?)\]/)?.[1]?.matchAll(/"([^"]+)"/g) ?? [])].map((x) => x[1]),
      heroVideo: body.match(/heroVideo:\s*"([^"]+)"/)?.[1] ?? null,
      previewVideo: body.match(/previewVideo:\s*"([^"]+)"/)?.[1] ?? null,
      poster: body.match(/poster:\s*"([^"]+)"/)?.[1] ?? null,
      thumbnail: body.match(/thumbnail:\s*"([^"]+)"/)?.[1] ?? null,
      screenshot: body.match(/screenshot:\s*"([^"]+)"/)?.[1] ?? null,
      processVideos: [...(body.match(/processVideos:\s*\[([\s\S]*?)\]/)?.[1]?.matchAll(/"([^"]+)"/g) ?? [])].map((x) => x[1]),
      duration: body.match(/duration:\s*"([^"]+)"/)?.[1] ?? null,
      format: body.match(/format:\s*"([^"]+)"/)?.[1] ?? null,
    };
    out.push(entry);
  }
  return out;
}

const dataCases = [
  ...parseEntries("data/itCases.ts", "it"),
  ...parseEntries("data/designCases.ts", "design"),
  ...parseEntries("data/videoCases.ts", "video"),
];

/* ───────────────────── case detail registry (Package 4) ───────────────────── */

// Reworked cases are data records, not hand-written pages: their copy, media
// and metadata come from data/case-records/. Node reads that TypeScript
// directly (built-in type stripping), so the inventory reports the very same
// source the app renders — it never re-derives a reworked case from markup
// that no longer holds the content.
const registryModule = await import(pathToFileURL(path.join(ROOT, "data/case-records/index.ts")).href);
const registryRecords = registryModule.caseRecords;
const registryById = new Map(registryRecords.map((r) => [r.id, r]));

const resolveRecordText = (value, locale, dict) =>
  value && typeof value.key === "string" ? dict[value.key] ?? null : value?.[locale] ?? null;

/** Depth-first walk over a record collecting CaseText nodes. */
function walkRecordText(node, visit, pathParts = []) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((n, i) => walkRecordText(n, visit, [...pathParts, i]));
    return;
  }
  const keys = Object.keys(node);
  if (keys.length === 1 && keys[0] === "key" && typeof node.key === "string") {
    visit({ type: "key", key: node.key, at: pathParts.join(".") });
    return;
  }
  if (keys.length === 2 && typeof node.uk === "string" && typeof node.en === "string") {
    visit({ type: "literal", uk: node.uk, en: node.en, at: pathParts.join(".") });
    return;
  }
  for (const k of keys) walkRecordText(node[k], visit, [...pathParts, k]);
}

const SECTION_KIND = {
  brief: "brief",
  featureList: "featureList",
  compare: "beforeAfter",
  gallery: "gallery",
  videoGrid: "videoGallery",
  results: "textKeys",
  prose: "textKeys",
  links: "links",
};

/** Media references held by one section, in document order. */
function sectionMedia(section) {
  const out = [];
  const push = (src) => { if (typeof src === "string" && src.startsWith("/media/")) out.push(src); };
  if (section.kind === "featureList") section.items.forEach((i) => i.images?.forEach((img) => push(img.src)));
  if (section.kind === "compare") section.items.forEach((i) => { push(i.before); push(i.after); });
  if (section.kind === "gallery") section.items.forEach((i) => push(i.src));
  if (section.kind === "videoGrid") section.items.forEach((i) => { push(i.src); push(i.poster); });
  return out;
}

/** Route entry built from a case record instead of from the page source. */
function routeEntryFromRecord({ caseId, dir, name, dataEntry, record }) {
  const usedKeys = new Set();
  const emptyLiterals = [];
  walkRecordText(record, (node) => {
    if (node.type === "key") usedKeys.add(node.key);
    else {
      if (!node.uk.trim()) emptyLiterals.push(`${node.at}:uk`);
      if (!node.en.trim()) emptyLiterals.push(`${node.at}:en`);
    }
  });
  const i18nKeyPrefixes = [...new Set([...usedKeys].map((k) => k.split(".").slice(0, 2).join(".")))]
    .filter((p) => /^(itCases|designCases|videoCases)\./.test(p));
  const missingEn = [...usedKeys].filter((k) => ukKeys.has(k) && !enKeys.has(k));
  const unknownKeys = [...usedKeys].filter((k) => !ukKeys.has(k) && !enKeys.has(k) && !k.includes("${"));

  const media = registryModule.collectRecordMedia(record, false).map(normalizeMediaKey);
  const mediaByType = {};
  for (const m of media) {
    const ext = m.split(".").pop().toLowerCase();
    mediaByType[ext] = (mediaByType[ext] || 0) + 1;
  }
  const videoCount = (mediaByType.mp4 || 0) + (mediaByType.webm || 0) + (mediaByType.mov || 0);
  const mediaMissing = media.filter((m) => !exists(path.join(ROOT, "public", m)));

  // Blocks are the record's ordered sections — the rendering order of the page.
  const blocks = record.sections.map((section, index) => ({
    name: `${section.kind}@${index}`,
    kind: SECTION_KIND[section.kind] ?? "unknown",
    line: null,
    itemCount: Array.isArray(section.items)
      ? section.items.length
      : section.kind === "brief"
        ? 2
        : section.kind === "prose"
          ? 1
          : 0,
    fromRecord: true,
  }));
  recordMedia(caseId, "hero", (() => {
    const out = [];
    const hero = record.hero;
    const push = (src) => { if (typeof src === "string" && src.startsWith("/media/")) out.push({ raw: src, role: "hero", index: null }); };
    if (hero.kind === "image") push(hero.src);
    if (hero.kind === "imageGrid") hero.items.forEach((i) => push(i.src));
    if (hero.kind === "videoGrid") hero.items.forEach((i) => { push(i.src); push(i.poster); });
    return out;
  })());
  record.sections.forEach((section, index) => {
    recordMedia(caseId, `${section.kind}@${index}`, sectionMedia(section).map((raw) => ({ raw, role: "record", index })));
  });
  if (record.review?.src) recordMedia(caseId, "review", [{ raw: record.review.src, role: "review", index: null }]);

  const pageLinks = new Map();
  const addLink = (url, source) => {
    if (!pageLinks.has(url)) pageLinks.set(url, { sources: new Set(), lines: [] });
    pageLinks.get(url).sources.add(source);
  };
  record.sections.forEach((section, index) => {
    if (section.kind === "featureList") {
      section.items.forEach((item, i) => { if (item.link) addLink(item.link.href, `record:${section.kind}[${index}].items[${i}].link`); });
    }
    if (section.kind === "links") section.items.forEach((item, i) => addLink(item.href, `record:${section.kind}[${index}].items[${i}]`));
  });
  const i18nLinks = [];
  for (const key of usedKeys) {
    const v = ukValues[key];
    if (isUrlValue(v)) i18nLinks.push({ key, url: v });
  }
  for (const key of Object.keys(ukValues)) {
    if (!i18nKeyPrefixes.some((p) => key.startsWith(p + "."))) continue;
    const v = ukValues[key];
    if (isUrlValue(v) && !i18nLinks.some((l) => l.key === key)) i18nLinks.push({ key, url: v, unreferenced: true });
  }

  // Same rule as the page parser: a key whose URL is actually rendered on the
  // page (through the record) is not orphaned, even when the key itself is
  // never referenced.
  const unreferenced = i18nLinks.filter((l) => l.unreferenced && !pageLinks.has(l.url));
  const reviewFlags = [];
  if (emptyLiterals.length) reviewFlags.push(`emptyLiteral:${emptyLiterals.join(",")}`);
  if (unreferenced.length) reviewFlags.push(`orphanedI18nLink:${unreferenced.map((l) => l.key).join(",")}`);
  if (mediaMissing.length) reviewFlags.push(`missingMedia:${mediaMissing.length}`);
  if (!blocks.length) reviewFlags.push("noStructuredContent");

  return {
    id: caseId,
    direction: dir,
    slug: name,
    uaPath: record.uaPath,
    enPath: record.enPath,
    inSitemap: null,
    inData: !!dataEntry,
    dataSlug: dataEntry?.slug ?? null,
    subcategory: record.subcategory,
    titleKey: dataEntry?.titleKey ?? null,
    descriptionKey: dataEntry?.descriptionKey ?? null,
    meta: {
      title: resolveRecordText(record.seo.title, "uk", ukValues),
      description: resolveRecordText(record.seo.description, "uk", ukValues),
      canonical: record.uaPath,
      ogImage: record.seo.ogImage,
      fromRecord: true,
    },
    enMetaTitle: resolveRecordText(record.seo.title, "en", enValues),
    enMetaDescription: resolveRecordText(record.seo.description, "en", enValues),
    h1Uk: resolveRecordText(record.h1, "uk", ukValues),
    h1En: resolveRecordText(record.h1, "en", enValues),
    cardStyle: dataEntry?.cardStyle ?? null,
    cardMedia: dataEntry?.cardMedia ?? null,
    mediaCount: media.length,
    mediaByType,
    videoCount,
    mediaMissing,
    mediaPathIssues: [],
    unparsedMedia: [],
    unparsedMediaCount: 0,
    externalLinks: {
      fromPage: [...pageLinks.entries()].map(([url, e]) => ({ url, sources: [...e.sources], lines: e.lines })),
      fromI18n: i18nLinks,
    },
    blocks,
    inlineMedia: [],
    i18nKeyPrefixes,
    missingEn,
    unknownKeys,
    hasReview: !!record.review,
    hasTeam: !!record.team,
    needsManualReview: reviewFlags.length > 0,
    reviewFlags,
    hasBothTranslations: missingEn.length === 0 && unknownKeys.length === 0 && emptyLiterals.length === 0,
    fromRecord: true,
  };
}

/* ───────────────────── page parsing helpers ───────────────────── */

/** Extract top-level `const NAME[: Type] = [ ... ];` arrays with bracket matching. */
function extractTopLevelArrays(src) {
  const out = [];
  const re = /^const\s+([A-Za-z0-9_]+)(?:\s*:[^=]+)?\s*=\s*\[/gm;
  let m;
  while ((m = re.exec(src))) {
    let i = src.indexOf("[", m.index + m[0].length - 1);
    if (i < 0) continue;
    let depth = 0;
    let j = i;
    let inStr = false;
    let esc = false;
    for (; j < src.length; j++) {
      const ch = src[j];
      if (inStr) {
        if (esc) esc = false;
        else if (ch === "\\") esc = true;
        else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') { inStr = true; continue; }
      if (ch === "[") depth++;
      else if (ch === "]") {
        depth--;
        if (depth === 0) { j++; break; }
      }
    }
    out.push({
      name: m[1],
      body: src.slice(i + 1, j - 1),
      line: src.slice(0, m.index).split("\n").length,
    });
    re.lastIndex = j;
  }
  return out;
}

/** Split an array body into top-level item sources. */
function splitTopLevel(body) {
  const items = [];
  let depth = 0;
  let cur = "";
  let inStr = false;
  let esc = false;
  for (const ch of body) {
    if (inStr) {
      cur += ch;
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') { inStr = true; cur += ch; continue; }
    if (ch === "[" || ch === "{") depth++;
    if (ch === "]" || ch === "}") depth--;
    if (ch === "," && depth === 0) {
      if (cur.trim()) items.push(cur.trim());
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) items.push(cur.trim());
  return items;
}

const SCALAR_STR_KEYS = ["src", "before", "after", "sliderBefore", "sliderAfter", "poster", "preview", "image", "alt", "label", "title", "duration", "titleKey", "captionKey", "descKey", "link", "linkLabelKey", "categoryKey"];
const SCALAR_NUM_KEYS = ["w", "h"];

/** Top-level string constants (e.g. `const BOT_URL = "https://..."`, `const hero = "/media/..."`). */
function extractStringConstants(src) {
  const map = {};
  const re = /^const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"([^"]*)"/gm;
  let m;
  while ((m = re.exec(src))) map[m[1]] = m[2];
  return map;
}

function parseItem(raw, index, constants = {}) {
  if (raw.startsWith('"')) {
    const value = raw.slice(1, -1);
    return {
      index,
      type: "string",
      value,
      isMediaPath: value.startsWith("/media/"),
    };
  }
  if (!raw.startsWith("{")) return { index, type: "unknown", raw: raw.slice(0, 120) };
  const fields = {};
  for (const key of SCALAR_STR_KEYS) {
    const mm = raw.match(new RegExp(`\\b${key}:\\s*"([^"]*)"`));
    if (mm) fields[key] = mm[1];
    else {
      // identifier reference to a top-level constant: `link: BOT_URL`
      const ident = raw.match(new RegExp(`\\b${key}:\\s*([A-Z][A-Z0-9_]*)\\b`));
      if (ident && constants[ident[1]] !== undefined) fields[key] = constants[ident[1]];
    }
  }
  for (const key of SCALAR_NUM_KEYS) {
    const mm = raw.match(new RegExp(`\\b${key}:\\s*(\\d+)`));
    if (mm) fields[key] = Number(mm[1]);
  }
  const wide = raw.match(/\bwide:\s*(true|false)/);
  if (wide) fields.wide = wide[1] === "true";
  const images = raw.match(/\bimages:\s*\[([\s\S]*?)\]/);
  if (images) fields.images = [...images[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  return { index, type: "object", fields };
}

function classifyBlock(name, items) {
  const first = items[0];
  if (!first) return "empty";
  if (first.type === "string") return first.isMediaPath ? "mediaList" : "textKeys";
  if (first.type !== "object") return "unknown";
  const f = first.fields;
  if ((f.before && f.after) || (f.sliderBefore && f.sliderAfter)) return "beforeAfter";
  if (f.images || f.image) return "featureList";
  if (f.src && (f.poster || f.duration || f.preview)) return "videoGallery";
  if (f.src) return "gallery";
  return "unknown";
}

/** Collect every media occurrence in one item (with role labels). */
function itemMedia(item) {
  const found = [];
  const push = (raw, role) => {
    if (typeof raw === "string" && raw.startsWith("/media/")) found.push({ raw, role });
  };
  if (item.type === "string") {
    push(item.value, "item");
    return found;
  }
  const f = item.fields;
  push(f.src, "src");
  push(f.before, "before");
  push(f.after, "after");
  push(f.sliderBefore, "sliderBefore");
  push(f.sliderAfter, "sliderAfter");
  push(f.poster, "poster");
  push(f.preview, "preview");
  push(f.image, "image");
  (f.images ?? []).forEach((im, i) => push(im, `images[${i}]`));
  return found;
}

/** Extract inline JSX array literals `{[ ... ].map(...)}` (media grids rendered inline). */
function extractJsxArrays(src) {
  const out = [];
  let idx = 0;
  for (;;) {
    const start = src.indexOf("{[", idx);
    if (start < 0) break;
    const bracket = start + 1;
    let depth = 0;
    let j = bracket;
    let inStr = false;
    let esc = false;
    for (; j < src.length; j++) {
      const ch = src[j];
      if (inStr) {
        if (esc) esc = false;
        else if (ch === "\\") esc = true;
        else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') { inStr = true; continue; }
      if (ch === "[") depth++;
      else if (ch === "]") {
        depth--;
        if (depth === 0) { j++; break; }
      }
    }
    const body = src.slice(bracket + 1, j - 1);
    const line = src.slice(0, start).split("\n").length;
    if (body.includes("/media/") || /\{[\s\S]*src:/.test(body)) {
      out.push({ name: `jsxArray@${line}`, body, line });
    }
    idx = j;
  }
  return out;
}

const normalizeMediaKey = (raw) => raw.split(/[?#]/)[0].trim();

/* ───────────────────── inline JSX scan ───────────────────── */

/** Find the `>` that closes a JSX tag, ignoring `>` inside `{...}` or strings. */
function findTagEnd(src, start) {
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let j = start; j < src.length; j++) {
    const ch = src[j];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') { inStr = true; continue; }
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    else if (ch === ">" && depth === 0) return j;
  }
  return -1;
}

function scanInline(src, constants = {}) {
  const inline = [];
  const lines = src.split("\n");
  lines.forEach((line, idx) => {
    const lineNo = idx + 1;
    // openFullscreen("...") or openFullscreen(CONST) — fullscreen video trigger
    const ofs = line.match(/openFullscreen\("([^"]+)"\)/);
    if (ofs) inline.push({ line: lineNo, kind: "fullscreenTrigger", src: ofs[1] });
    else {
      const ofi = line.match(/openFullscreen\(([A-Z][A-Z0-9_]*)\)/);
      if (ofi && constants[ofi[1]]) inline.push({ line: lineNo, kind: "fullscreenTrigger", src: constants[ofi[1]] });
    }
    // JSX hrefs handled by caller (full-source scan)
  });
  // Generic JSX tag scan: find <video|<audio|<Image|<GalleryImage|<img opening
  // tags, capture the full attribute span (tags may span many lines).
  const tagRe = /<(video|audio|Image|GalleryImage|img)\b/g;
  let tm;
  while ((tm = tagRe.exec(src))) {
    const start = tm.index;
    const tag = tm[1];
    const end = findTagEnd(src, start);
    if (end < 0) continue;
    const attrs = src.slice(start, end);
    const lineNo = src.slice(0, start).split("\n").length;
    const vsrc = attrs.match(/\bsrc="([^"]+)"/)?.[1];
    const poster = attrs.match(/\bposter="([^"]+)"/)?.[1];
    const preload = attrs.match(/\bpreload="([^"]+)"/)?.[1];
    const alt = attrs.match(/\balt="([^"]*)"/)?.[1];
    const altKey = attrs.match(/\balt=\{t\("([^"]+)"\)\}/)?.[1];
    if (tag === "video" || tag === "audio") {
      if (vsrc || poster) inline.push({ line: lineNo, kind: tag, src: vsrc ?? null, poster: poster ?? null, preload: preload ?? null });
    } else {
      if (vsrc) inline.push({ line: lineNo, kind: "image", src: vsrc, poster: null, alt: alt ?? null, altKey: altKey ?? null, component: tag });
    }
    tagRe.lastIndex = end;
  }
  // JSX hrefs to external sites (full source): literal or top-level constant
  const hrefs = [];
  const hrefRe = /href=(?:"(https?:\/\/[^"]+)"|\{([A-Z][A-Z0-9_]*)\})/g;
  let hm;
  while ((hm = hrefRe.exec(src))) {
    const url = hm[1] ?? constants[hm[2]];
    if (url && /^https?:/.test(url)) {
      hrefs.push({ url, line: src.slice(0, hm.index).split("\n").length, source: hm[1] ? "jsx-href" : `jsx-href:${hm[2]}` });
    }
  }
  return { inline, hrefs };
}

/* ───────────────────── per-case parse ───────────────────── */

const directions = ["it", "design", "video"];
const routes = [];
const mediaUsage = new Map(); // normalized path -> [{caseId, block, role, index, raw}]

function recordMedia(caseId, block, occurrences) {
  for (const occ of occurrences) {
    const key = normalizeMediaKey(occ.raw);
    if (!mediaUsage.has(key)) mediaUsage.set(key, []);
    mediaUsage.get(key).push({ caseId, block, role: occ.role, index: occ.index ?? null, raw: occ.raw });
  }
}

for (const dir of directions) {
  const base = path.join(ROOT, "app/(uk)/cases", dir);
  if (!exists(base)) continue;
  for (const name of fs.readdirSync(base)) {
    const pageFile = path.join(base, name, "page.tsx");
    if (!fs.existsSync(pageFile)) continue;
    const layoutFile = path.join(base, name, "layout.tsx");
    const page = fs.readFileSync(pageFile, "utf8");
    const layout = fs.existsSync(layoutFile) ? fs.readFileSync(layoutFile, "utf8") : "";
    const caseId = `${dir}/${name}`;

    /* ── reworked case: everything comes from the record ── */
    const record = registryById.get(caseId);
    if (record) {
      const dirData = dataCases.find((c) => c.slug === name && c.kind === dir);
      const dirDataByHref = dataCases.find((c) => c.href === `/cases/${dir}/${name}`);
      routes.push(routeEntryFromRecord({ caseId, dir, name, dataEntry: dirData ?? dirDataByHref ?? null, record }));
      continue;
    }

    /* ── metadata ── */
    const meta = {
      title: layout.match(/title:\s*"([^"]+)"/)?.[1] ?? null,
      description: layout.match(/description:\s*"([^"]+)"/)?.[1] ?? null,
      canonical: layout.match(/canonical:\s*"([^"]+)"/)?.[1] ?? null,
      ogImage: layout.match(/images:\s*\[\s*"([^"]+)"/)?.[1] ?? null,
    };

    /* ── structured blocks from const arrays + inline JSX array literals ── */
    const constants = extractStringConstants(page);
    const arrays = [...extractTopLevelArrays(page), ...extractJsxArrays(page)].sort((a, b) => a.line - b.line);
    const blocks = [];
    const parseIssues = [];
    for (const arr of arrays) {
      let items;
      try {
        items = splitTopLevel(arr.body).map((raw, i) => parseItem(raw, i, constants));
      } catch (err) {
        parseIssues.push(`arrayParseFailed:${arr.name}:${String(err.message).slice(0, 60)}`);
        continue;
      }
      if (items.some((it) => it.type === "unknown")) {
        parseIssues.push(`unknownItems:${arr.name}`);
      }
      const kind = classifyBlock(arr.name, items);
      const block = {
        name: arr.name,
        kind,
        line: arr.line,
        itemCount: items.length,
        items: items.map((it) => {
          if (it.type === "string") {
            return {
              index: it.index,
              type: "string",
              value: it.value,
              kind: it.isMediaPath ? "media" : "i18nKey",
              captionUk: it.isMediaPath ? null : ukValues[it.value] ?? null,
              captionEn: it.isMediaPath ? null : enValues[it.value] ?? null,
            };
          }
          if (it.type === "object") {
            const f = it.fields;
            return {
              index: it.index,
              type: "object",
              src: f.src ?? null,
              before: f.before ?? f.sliderBefore ?? null,
              after: f.after ?? f.sliderAfter ?? null,
              sliderBefore: f.sliderBefore ?? null,
              sliderAfter: f.sliderAfter ?? null,
              poster: f.poster ?? null,
              preview: f.preview ?? null,
              image: f.image ?? null,
              images: f.images ?? null,
              alt: f.alt ?? null,
              label: f.label ?? null,
              title: f.title ?? null,
              duration: f.duration ?? null,
              width: f.w ?? null,
              height: f.h ?? null,
              wide: f.wide ?? null,
              titleKey: f.titleKey ?? null,
              captionKey: f.captionKey ?? null,
              descKey: f.descKey ?? null,
              link: f.link ?? null,
              linkLabelKey: f.linkLabelKey ?? null,
              captions: {
                titleUk: f.titleKey ? ukValues[f.titleKey] ?? null : null,
                titleEn: f.titleKey ? enValues[f.titleKey] ?? null : null,
                captionUk: f.captionKey ? ukValues[f.captionKey] ?? null : null,
                captionEn: f.captionKey ? enValues[f.captionKey] ?? null : null,
                linkLabelUk: f.linkLabelKey ? ukValues[f.linkLabelKey] ?? null : null,
                linkLabelEn: f.linkLabelKey ? enValues[f.linkLabelKey] ?? null : null,
              },
            };
          }
          return { index: it.index, type: "unknown" };
        }),
      };
      blocks.push(block);
      // record media usage with block binding + order
      items.forEach((it, i) => {
        recordMedia(caseId, `${arr.name}[${i}]`, itemMedia(it).map((o) => ({ ...o, index: i })));
      });
    }

    /* ── inline JSX media + external hrefs ── */
    const { inline, hrefs } = scanInline(page, constants);
    for (const it of inline) {
      const occ = [];
      if (it.src) occ.push({ raw: it.src, role: `${it.kind}.src` });
      if (it.poster) occ.push({ raw: it.poster, role: `${it.kind}.poster` });
      recordMedia(caseId, `inline@${it.line}`, occ.map((o) => ({ ...o, index: null })));
    }
    // Top-level string constants that hold media paths (e.g. `const hero = "/media/..."`)
    for (const [cname, cval] of Object.entries(constants)) {
      if (cval.startsWith("/media/")) recordMedia(caseId, `const:${cname}`, [{ raw: cval, role: "const", index: null }]);
    }

    /* ── i18n keys used (literal + from parsed arrays) ── */
    const usedKeys = new Set();
    for (const mm of page.matchAll(/["']((?:itCases|designCases|videoCases)\.[A-Za-z0-9_.]+)["']/g)) usedKeys.add(mm[1]);
    for (const b of blocks) {
      for (const it of b.items) {
        if (it.type === "string" && it.kind === "i18nKey") usedKeys.add(it.value);
        if (it.type === "object") {
          for (const k of [it.titleKey, it.captionKey, it.descKey, it.linkLabelKey]) if (k) usedKeys.add(k);
        }
      }
    }
    for (const it of inline) if (it.altKey) usedKeys.add(it.altKey);
    const i18nKeyPrefixes = [...new Set([...usedKeys].map((k) => k.split(".").slice(0, 2).join(".")))].filter((p) => /^(itCases|designCases|videoCases)\./.test(p));

    /* ── external links: union of JSX hrefs, array link:, i18n URL values ── */
    const pageLinks = new Map(); // url -> {sources:Set, lines:[]}
    const addLink = (url, source, line) => {
      if (!pageLinks.has(url)) pageLinks.set(url, { sources: new Set(), lines: [] });
      const e = pageLinks.get(url);
      e.sources.add(source);
      if (line) e.lines.push(line);
    };
    for (const h of hrefs) addLink(h.url, h.source, h.line);
    for (const b of blocks) {
      b.items.forEach((it, bIdx) => {
        if (it.type === "object" && it.link) addLink(it.link, `array:${b.name}[${bIdx}].link`, b.line);
      });
    }
    const i18nLinks = [];
    for (const key of usedKeys) {
      const v = ukValues[key];
      if (isUrlValue(v)) i18nLinks.push({ key, url: v });
    }
    // i18n URL values under this case's prefixes even if the key is not referenced
    for (const key of Object.keys(ukValues)) {
      if (!i18nKeyPrefixes.some((p) => key.startsWith(p + "."))) continue;
      const v = ukValues[key];
      if (isUrlValue(v) && !i18nLinks.some((l) => l.key === key)) i18nLinks.push({ key, url: v, unreferenced: true });
    }
    const externalLinks = {
      fromPage: [...pageLinks.entries()].map(([url, e]) => ({ url, sources: [...e.sources], lines: e.lines })),
      fromI18n: i18nLinks,
    };

    /* ── translation status ── */
    const missingEn = [...usedKeys].filter((k) => ukKeys.has(k) && !enKeys.has(k));
    const unknownKeys = [...usedKeys].filter((k) => !ukKeys.has(k) && !enKeys.has(k) && !k.includes("${"));

    /* ── completeness flags ── */
    const rawMedia = [...new Set([...page.matchAll(/["'`](\/media\/[^"'`?#]+)(?:[?#][^"'`]*)?["'`]/g)].map((m) => m[1].trim()))];
    const structuredMedia = new Set();
    for (const b of blocks) {
      for (const it of b.items) {
        if (it.type === "string" && it.kind === "media") structuredMedia.add(normalizeMediaKey(it.value));
        if (it.type === "object") {
          for (const v of [it.src, it.before, it.after, it.sliderBefore, it.sliderAfter, it.poster, it.preview, it.image, ...(it.images ?? [])]) {
            if (v && v.startsWith("/media/")) structuredMedia.add(normalizeMediaKey(v));
          }
        }
      }
    }
    for (const it of inline) {
      for (const v of [it.src, it.poster]) {
        if (v && v.startsWith("/media/")) structuredMedia.add(normalizeMediaKey(v));
      }
    }
    for (const v of Object.values(constants)) {
      if (v.startsWith("/media/")) structuredMedia.add(normalizeMediaKey(v));
    }
    const unparsedMedia = rawMedia.filter((r) => !structuredMedia.has(normalizeMediaKey(r)));
    const mediaPathIssues = [...page.matchAll(/["'`](\/media\/[^"'`?#]+(?:[?#][^"'`]*)?)["'`]/g)]
      .map((m) => m[1])
      .filter((m) => m !== m.trim())
      .map((m) => ({ raw: m, reason: "whitespace" }));
    const unreferencedI18nLinks = i18nLinks.filter(
      (l) => l.unreferenced && ![...pageLinks.keys()].includes(l.url)
    );

    const reviewFlags = [];
    if (parseIssues.length) reviewFlags.push(...parseIssues);
    if (unreferencedI18nLinks.length) reviewFlags.push(`orphanedI18nLink:${unreferencedI18nLinks.map((l) => l.key).join(",")}`);
    if (unparsedMedia.length) reviewFlags.push(`unparsedMedia:${unparsedMedia.length}`);
    if (!blocks.length && !inline.length) reviewFlags.push("noStructuredContent");
    const mediaMissing = rawMedia.filter((m) => !exists(path.join(ROOT, "public", normalizeMediaKey(m))));
    if (mediaMissing.length) reviewFlags.push(`missingMedia:${mediaMissing.length}`);

    const dirData = dataCases.find((c) => c.slug === name && c.kind === dir);
    const dirDataByHref = dataCases.find((c) => c.href === `/cases/${dir}/${name}`);
    const dataEntry = dirData ?? dirDataByHref ?? null;

    const hasReview = [...usedKeys].some((k) => /\.review|reviewText|reviewAuthor|videoReview/i.test(k));
    const hasTeam = [...usedKeys].some((k) => /teamMember|projectTeam|Developer|andrii/i.test(k));

    const mediaByType = {};
    for (const m of rawMedia) {
      const ext = m.split(".").pop().toLowerCase();
      mediaByType[ext] = (mediaByType[ext] || 0) + 1;
    }
    const videoCount = (mediaByType.mp4 || 0) + (mediaByType.webm || 0) + (mediaByType.mov || 0);

    routes.push({
      id: caseId,
      direction: dir,
      slug: name,
      uaPath: `/cases/${dir}/${name}`,
      enPath: `/en/cases/${dir}/${name}`,
      inSitemap: null, // filled after sitemap parse
      inData: !!dataEntry,
      dataSlug: dataEntry?.slug ?? null,
      subcategory: dataEntry?.subcategory ?? null,
      titleKey: dataEntry?.titleKey ?? null,
      descriptionKey: dataEntry?.descriptionKey ?? null,
      meta,
      cardStyle: dataEntry?.cardStyle ?? null,
      cardMedia: dataEntry?.cardMedia ?? null,
      mediaCount: rawMedia.length,
      mediaByType,
      videoCount,
      mediaMissing,
      mediaPathIssues,
      unparsedMedia,
      unparsedMediaCount: unparsedMedia.length,
      externalLinks,
      blocks,
      inlineMedia: inline,
      i18nKeyPrefixes,
      missingEn,
      unknownKeys,
      hasReview,
      hasTeam,
      needsManualReview: reviewFlags.length > 0,
      reviewFlags,
      hasBothTranslations: missingEn.length === 0 && unknownKeys.length === 0,
    });
  }
}

/* ───────────────────── sitemap + cross-checks ───────────────────── */

// The app sitemap is generated from lib/site-routes.ts (data-file hrefs + the
// static list, deduped). Mirror that derivation here so cross-checks compare
// against the actual route set rather than parsing the generator source.
// No hand-maintained extra URLs: a route missing from a data file is missing
// from the sitemap too.
const sitemapPaths = [
  ...new Set([
    "/", "/cases",
    "/services/it", "/services/design", "/services/video",
    "/partners",
    ...dataCases.map((c) => c.href).filter(Boolean),
    "/en", "/en/cases",
    "/en/services/it", "/en/services/design", "/en/services/video",
    "/en/partners",
    // English case pages exist only for reworked records (Package 4).
    ...registryRecords.map((r) => r.enPath),
  ]),
];
for (const r of routes) r.inSitemap = sitemapPaths.includes(r.uaPath);

const relatedSrc = read("components/sections/RelatedProjectsSection.tsx");
const relatedSlugs = new Set([...relatedSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));

const staticRoutes = [
  { uaPath: "/", enPath: "/en", file: "app/(uk)/page.tsx", newUaPath: "/", newEnPath: "/en", redirect: null, inSitemap: sitemapPaths.includes("/") },
  { uaPath: "/cases", enPath: "/en/cases", file: "app/(uk)/cases/page.tsx", newUaPath: "/cases", newEnPath: "/en/cases", redirect: null, inSitemap: sitemapPaths.includes("/cases") },
  // Category pages: source of a permanent redirect to the direction page
  // (activated in Package 3). They are not canonical pages and not in the
  // sitemap anymore.
  { uaPath: "/cases/it", enPath: null, file: null, newUaPath: "/services/it", newEnPath: "/en/services/it", redirect: { from: "/cases/it", to: "/services/it#cases", activateIn: 3 }, inSitemap: sitemapPaths.includes("/cases/it") },
  { uaPath: "/cases/design", enPath: null, file: null, newUaPath: "/services/design", newEnPath: "/en/services/design", redirect: { from: "/cases/design", to: "/services/design#cases", activateIn: 3 }, inSitemap: sitemapPaths.includes("/cases/design") },
  { uaPath: "/cases/video", enPath: null, file: null, newUaPath: "/services/video", newEnPath: "/en/services/video", redirect: { from: "/cases/video", to: "/services/video#cases", activateIn: 3 }, inSitemap: sitemapPaths.includes("/cases/video") },
  { uaPath: "/partners", enPath: "/en/partners", file: "app/(uk)/partners/page.tsx", newUaPath: "/partners", newEnPath: "/en/partners", redirect: null, inSitemap: sitemapPaths.includes("/partners") },
];

/* ───────────────────── media reuse map ───────────────────── */

const mediaReuse = [...mediaUsage.entries()]
  .map(([path, usages]) => ({ path, useCount: usages.length, cases: [...new Set(usages.map((u) => u.caseId))], usages }))
  .sort((a, b) => b.useCount - a.useCount || a.path.localeCompare(b.path));
const reusedMedia = mediaReuse.filter((m) => m.cases.length > 1);

/* ───────────────────── expectations for check-urls ───────────────────── */

function langOf(p) {
  return p === "/en" || p.startsWith("/en/") ? "en" : "uk";
}
const expectations = [];
const addPage = (p, extra = {}) => {
  const canonicalPath = p === "/en/" ? "/en" : p.replace(/\/$/, "") || "/";
  expectations.push({
    path: p,
    kind: "page",
    phase: extra.phase ?? "current",
    lang: langOf(canonicalPath),
    canonical: `${BASE}${canonicalPath === "/" ? "" : canonicalPath}` || BASE,
    ...extra,
  });
};
// current system (phase: current)
const BRAND_TITLE = "Freelance UA || Digital Agency";
// Home descriptions live in the dictionary (meta.home.description), not in the
// pages, so this reads them the same way localizedMetadata does.
addPage("/", { title: BRAND_TITLE, description: ukValues["meta.home.description"], bilingualPair: true, hreflang: { uk: "/", en: "/en" } });
addPage("/cases", { title: ukValues["meta.cases.title"], description: ukValues["meta.cases.description"], bilingualPair: true, hreflang: { uk: "/cases", en: "/en/cases" } });
addPage("/partners", { title: ukValues["meta.partners.title"], description: ukValues["meta.partners.description"], bilingualPair: true, hreflang: { uk: "/partners", en: "/en/partners" } });
// Direction pages (live since Package 3)
for (const d of ["it", "design", "video"]) {
  addPage(`/services/${d}`, {
    phase: "current",
    title: ukValues[`meta.services.${d}.title`],
    description: ukValues[`meta.services.${d}.description`],
    h1: ukValues[`services.${d}.category`],
    bilingualPair: true,
    hreflang: { uk: `/services/${d}`, en: `/en/services/${d}` },
  });
  addPage(`/en/services/${d}`, {
    phase: "current",
    title: enValues[`meta.services.${d}.title`],
    description: enValues[`meta.services.${d}.description`],
    h1: enValues[`services.${d}.category`],
    bilingualPair: true,
    hreflang: { uk: `/services/${d}`, en: `/en/services/${d}` },
  });
  // Old category URLs: permanent redirects. Emitted as `kind: "redirect"`
  // (not as a page with a planned redirect) — Package 3 made the destination
  // pages live, so the checker enforces them unconditionally.
  expectations.push({ path: `/cases/${d}`, kind: "redirect", phase: "current", to: `/services/${d}#cases`, status: [301, 308] });
  expectations.push({ path: `/en/cases/${d}`, kind: "redirect", phase: "current", to: `/en/services/${d}#cases`, status: [301, 308] });
}
// English pages that are live after Package 2
addPage("/en", { phase: "current", title: BRAND_TITLE, description: enValues["meta.home.description"], bilingualPair: true, hreflang: { uk: "/", en: "/en" } });
addPage("/en/cases", { phase: "current", title: enValues["meta.cases.title"], description: enValues["meta.cases.description"], bilingualPair: true, hreflang: { uk: "/cases", en: "/en/cases" } });
addPage("/en/partners", { phase: "current", title: enValues["meta.partners.title"], description: enValues["meta.partners.description"], bilingualPair: true, hreflang: { uk: "/partners", en: "/en/partners" } });
for (const r of routes) {
  // Only reworked cases have a live EN twin, so only they are enforced as a
  // full bilingual pair (own OG/Twitter set + reciprocal hreflang).
  const bilingual = r.fromRecord === true;
  addPage(r.uaPath, {
    title: r.meta.title,
    description: r.meta.description,
    h1: r.h1Uk ?? (r.titleKey ? ukValues[r.titleKey] ?? null : null),
    inRegistry: true,
    ...(bilingual ? { bilingualPair: true } : {}),
  });
}
// EN case pages: `current` (published, must be in the sitemap) as soon as the
// record is reworked, `target` until then — never a false hreflang counterpart.
for (const r of routes) {
  if (r.fromRecord) {
    addPage(r.enPath, {
      phase: "current",
      inRegistry: true,
      title: r.enMetaTitle,
      description: r.enMetaDescription,
      h1: r.h1En,
      bilingualPair: true,
      hreflang: { uk: r.uaPath, en: r.enPath },
    });
  } else {
    addPage(r.enPath, { phase: "target", inRegistry: true, hreflang: { uk: r.uaPath, en: r.enPath } });
  }
  // UA case pages gain hreflang in the target system
  const entry = expectations.find((e) => e.path === r.uaPath);
  if (entry) entry.hreflang = { uk: r.uaPath, en: r.enPath };
}

/* ───────────────────── issues ───────────────────── */

const issues = [];
for (const r of routes) {
  if (!r.inSitemap) issues.push({ type: "route-not-in-sitemap", id: r.id, uaPath: r.uaPath });
  if (!r.inData) issues.push({ type: "route-not-in-data", id: r.id, uaPath: r.uaPath });
  if (r.inData && r.dataSlug !== r.slug) issues.push({ type: "data-slug-mismatch", id: r.id, dataSlug: r.dataSlug });
  if (r.mediaMissing.length) issues.push({ type: "missing-media", id: r.id, files: r.mediaMissing });
  if (r.mediaPathIssues.length) issues.push({ type: "media-path-whitespace", id: r.id, paths: r.mediaPathIssues });
  if (r.missingEn.length) issues.push({ type: "missing-en-translation", id: r.id, keys: r.missingEn });
  if (r.unknownKeys.length) issues.push({ type: "unknown-i18n-keys", id: r.id, keys: r.unknownKeys });
  if (!r.meta.title) issues.push({ type: "no-meta-title", id: r.id });
  if (!r.meta.canonical) issues.push({ type: "no-canonical", id: r.id });
  if (r.meta.canonical && r.meta.canonical !== r.uaPath) issues.push({ type: "canonical-mismatch", id: r.id, canonical: r.meta.canonical, uaPath: r.uaPath });
  if (r.needsManualReview) issues.push({ type: "needs-manual-review", id: r.id, flags: r.reviewFlags });
  if (r.unparsedMediaCount) issues.push({ type: "unparsed-media", id: r.id, files: r.unparsedMedia });
  // card media existence
  if (r.cardMedia) {
    const refs = [r.cardMedia.image, r.cardMedia.heroVideo, r.cardMedia.poster, r.cardMedia.thumbnail, r.cardMedia.screenshot,
      ...(r.cardMedia.galleryImages ?? []), ...(r.cardMedia.processVideos ?? [])].filter(Boolean).map((p) => normalizeMediaKey(p));
    const missing = refs.filter((p) => !exists(path.join(ROOT, "public", p)));
    if (missing.length) issues.push({ type: "data-missing-media", id: r.id, files: missing });
  }
}
for (const p of sitemapPaths) {
  const isCase = /^\/cases\/(it|design|video)\//.test(p);
  const isEnCase = /^\/en\/cases\/(it|design|video)\//.test(p);
  const isDirection = /^\/(en\/)?services\/(it|design|video)$/.test(p);
  const isEnStatic = p === "/en" || p === "/en/cases" || p === "/en/partners";
  if (isCase && !routes.some((r) => r.uaPath === p)) issues.push({ type: "sitemap-without-route", path: p });
  if (isEnCase && !routes.some((r) => r.enPath === p)) issues.push({ type: "sitemap-without-en-route", path: p });
  if (!isCase && !isEnCase && !isDirection && !isEnStatic && !staticRoutes.some((s) => s.uaPath === p)) issues.push({ type: "sitemap-unclassified", path: p });
}
for (const d of dataCases) {
  if (!routes.some((r) => r.direction === d.kind && (r.slug === d.slug || r.uaPath === d.href))) {
    issues.push({ type: "data-without-route", kind: d.kind, slug: d.slug, href: d.href });
  }
}
// duplicate direction+slug (primary key uniqueness)
{
  const seen = new Set();
  for (const r of routes) {
    const k = `${r.direction}/${r.slug}`;
    if (seen.has(k)) issues.push({ type: "duplicate-direction-slug", id: k });
    seen.add(k);
  }
}
// The language switcher / hreflang list (lib/i18n-routes.ts) and the case
// registry must describe the same set of bilingual case pages. One is a plain
// string array for the client bundle, the other holds the content — they are
// kept honest here instead of by hand.
{
  const src = read("lib/i18n-routes.ts");
  const at = src.indexOf("BILINGUAL_UA_PATHS");
  const block = at >= 0 ? src.slice(at, src.indexOf("];", at)) : "";
  const bilingualPaths = [...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const registryUa = new Set(registryRecords.map((r) => r.uaPath));
  for (const r of registryRecords) {
    if (!bilingualPaths.includes(r.uaPath)) {
      issues.push({ type: "bilingual-vs-registry", id: r.id, problem: "missing-from-i18n-routes", uaPath: r.uaPath });
    }
    if (r.enPath !== `/en${r.uaPath}`) {
      issues.push({ type: "bilingual-vs-registry", id: r.id, problem: "en-path-mismatch", enPath: r.enPath });
    }
  }
  for (const p of bilingualPaths) {
    if (p.startsWith("/cases/") && !registryUa.has(p)) {
      issues.push({ type: "bilingual-vs-registry", problem: "stale-in-i18n-routes", uaPath: p });
    }
  }
}
// RelatedProjectsSection hardcoded list coverage (to be replaced by registry lookup)
{
  const missing = routes.filter((r) => !relatedSlugs.has(r.slug));
  if (missing.length) issues.push({ type: "related-projects-incomplete", count: missing.length, missing: missing.map((r) => r.id) });
  const extra = [...relatedSlugs].filter((s) => !routes.some((r) => r.slug === s));
  if (extra.length) issues.push({ type: "related-projects-unknown-slug", slugs: extra });
}

/* ───────────────────── report ───────────────────── */

const report = {
  generatedAt: new Date().toISOString(),
  counts: {
    routes: routes.length,
    byDirection: Object.fromEntries(directions.map((d) => [d, routes.filter((r) => r.direction === d).length])),
    inSitemap: routes.filter((r) => r.inSitemap).length,
    inData: routes.filter((r) => r.inData).length,
    withFullTranslation: routes.filter((r) => r.hasBothTranslations).length,
    withMissingMedia: routes.filter((r) => r.mediaMissing.length > 0).length,
    withExternalLinks: routes.filter((r) => r.externalLinks.fromPage.length + r.externalLinks.fromI18n.length > 0).length,
    withManualReview: routes.filter((r) => r.needsManualReview).length,
    withBlocks: routes.filter((r) => r.blocks.length > 0).length,
    sitemapPaths: sitemapPaths.length,
    i18nUkKeys: ukKeys.size,
    i18nEnKeys: enKeys.size,
    i18nMissingEn: [...ukKeys].filter((k) => !enKeys.has(k)),
    mediaRefsTracked: mediaUsage.size,
    reusedMediaFiles: reusedMedia.length,
  },
  staticRoutes,
  mediaReuse: mediaReuse.map((m) => ({ path: m.path, useCount: m.useCount, cases: m.cases })),
  routes,
};

fs.writeFileSync(path.join(OUT, "registry.json"), JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(OUT, "expectations.json"), JSON.stringify({ generatedAt: report.generatedAt, base: BASE, entries: expectations }, null, 2));

/* CSV */
const csvHeader = [
  "id", "direction", "subcategory", "uaPath", "enPath", "inSitemap", "inData", "title",
  "canonical", "hasEn", "missingEnCount", "mediaCount", "videoCount", "missingMedia", "extLinksPage", "extLinksI18n",
  "review", "team", "blocks", "manualReview", "hardcodedUa",
];
const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
// Markdown table cells: escape pipes and collapse newlines so titles like
// "E.V.A. CODE™ | Freelance UA" do not break the table.
const mdCell = (v) => String(v ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const rows = routes.map((r) => [
  r.id, r.direction, r.subcategory, r.uaPath, r.enPath, r.inSitemap, r.inData,
  r.meta.title, r.meta.canonical, r.hasBothTranslations, r.missingEn.length,
  r.mediaCount, r.videoCount, r.mediaMissing.length,
  r.externalLinks.fromPage.length, r.externalLinks.fromI18n.length,
  r.hasReview, r.hasTeam,
  r.blocks.map((b) => `${b.name}:${b.kind}(${b.itemCount})`).join("|"),
  r.needsManualReview ? r.reviewFlags.join(";") : "",
  r.inlineMedia.filter((x) => x.alt).length,
].map(esc).join(","));
fs.writeFileSync(path.join(OUT, "registry.csv"), [csvHeader.join(","), ...rows].join("\n"));

/* Markdown summary */
const md = [];
md.push("# Реєстр кейсів Freelance UA (генеровано scripts/inventory.mjs v2)");
md.push("");
md.push(`Згенеровано: ${report.generatedAt}`);
md.push("");
md.push("| Напрям | Кейсів | У sitemap | У data | Повний EN | З відео | З відгуком | З блоками | Потребує звірки |");
md.push("|---|---|---|---|---|---|---|---|---|");
for (const d of directions) {
  const rs = routes.filter((r) => r.direction === d);
  md.push(`| ${d} | ${rs.length} | ${rs.filter((r) => r.inSitemap).length} | ${rs.filter((r) => r.inData).length} | ${rs.filter((r) => r.hasBothTranslations).length} | ${rs.filter((r) => r.videoCount > 0).length} | ${rs.filter((r) => r.hasReview).length} | ${rs.filter((r) => r.blocks.length).length} | ${rs.filter((r) => r.needsManualReview).length} |`);
}
md.push("");
for (const d of directions) {
  md.push(`## ${d.toUpperCase()}`);
  md.push("");
  md.push("| ID | Підкатегорія | UA URL | Title | Медіа | Відео | Лінки (page/i18n) | Блоки | Звірка |");
  md.push("|---|---|---|---|---|---|---|---|---|");
  for (const r of routes.filter((x) => x.direction === d)) {
    const ext = `${r.externalLinks.fromPage.length}/${r.externalLinks.fromI18n.length}`;
    const blocks = r.blocks.filter((b) => b.kind !== "textKeys" && b.kind !== "empty")
      .map((b) => `${b.name}:${b.kind.replace(/([A-Z])/g, "-$1").toLowerCase()}×${b.itemCount}`).join("<br>") || "—";
    md.push(`| ${r.slug} | ${r.subcategory ?? "—"} | \`${r.uaPath}\` | ${mdCell(r.meta.title)} | ${r.mediaCount} | ${r.videoCount} | ${ext} | ${blocks} | ${r.needsManualReview ? "⚠ " + r.reviewFlags.length : "—"} |`);
  }
  md.push("");
}
/* manual review section */
const flagged = routes.filter((r) => r.needsManualReview);
md.push("## Потребує ручної звірки");
md.push("");
if (flagged.length) {
  md.push("| Кейс | Прапорці |");
  md.push("|---|---|");
  for (const r of flagged) md.push(`| \`${r.uaPath}\` | ${r.reviewFlags.map((f) => mdCell(f)).join("<br>")} |`);
} else {
  md.push("Немає.");
}
md.push("");
/* reused media */
md.push("## Медіа з повторним використанням (файли, що зустрічаються у кількох кейсах)");
md.push("");
md.push("| Файл | Кейсів | Вживань | Кейси |");
md.push("|---|---|---|---|");
for (const m of reusedMedia.slice(0, 40)) {
  md.push(`| \`${m.path}\` | ${m.cases.length} | ${m.useCount} | ${m.cases.slice(0, 6).join(", ")}${m.cases.length > 6 ? "…" : ""} |`);
}
if (reusedMedia.length > 40) md.push(`| … | | | ще ${reusedMedia.length - 40} файлів |`);
md.push("");
fs.writeFileSync(path.join(OUT, "registry.md"), md.join("\n"));

/* Routes table */
const routeMap = [];
routeMap.push("# Карта маршрутів і перенаправлень");
routeMap.push("");
routeMap.push("## Статичні сторінки");
routeMap.push("");
routeMap.push("| Призначення | Чинний UA | Цільовий UA | Цільовий EN | Redirect (Пакет 3) | Source |");
routeMap.push("|---|---|---|---|---|---|");
for (const s of staticRoutes) {
  routeMap.push(`| ${s.uaPath} | \`${s.uaPath}\` | \`${s.newUaPath}\` | \`${s.newEnPath}\` | ${s.redirect ? `\`${s.redirect.from}\` → \`${s.redirect.to}\` (308)` : "—"} | ${s.file} |`);
}
routeMap.push("");
routeMap.push("## Детальні кейси");
routeMap.push("");
routeMap.push("| Напрям | UA (зберігається) | EN (новий) | Sitemap | Data |");
routeMap.push("|---|---|---|---|---|");
for (const r of routes) {
  routeMap.push(`| ${r.direction} | \`${r.uaPath}\` | \`${r.enPath}\` | ${r.inSitemap ? "так" : "НІ"} | ${r.inData ? "так" : "НІ"} |`);
}
routeMap.push("");
routeMap.push("## Нормалізація параметрів каталогу");
routeMap.push("");
routeMap.push("| Старий URL | Поведінка | Рішення |");
routeMap.push("|---|---|---|");
routeMap.push("| `/cases?tab=it\\|design\\|video` | фільтр клієнтським скриптом, canonical → `/cases` | лишити параметр як фільтр; не SEO-сторінка |");
routeMap.push("| `/cases?tab=design&type=photo-retouch` | підфільтр | лишити як фільтр; не окремий canonical |");
routeMap.push("| `/cases?tab=...&type=ecommerce\\|landing\\|saas-telegram` | підфільтр IT | аналогічно |");
routeMap.push("| `/cases?tab=...&type=reels\\|motion\\|youtube\\|ai` | підфільтр відео | аналогічно |");
routeMap.push("");
routeMap.push("Правило: параметри `tab`/`type` — суто сортування/відображення. Вони не породжують окремі SEO-сторінки, canonical завжди веде на основний вміст (`/cases` або сторінка напряму).");
routeMap.push("");
routeMap.push("## Цільові адреси сторінок напрямів (Пакет 3)");
routeMap.push("");
routeMap.push("| UA | EN | Примітка |");
routeMap.push("|---|---|---|");
routeMap.push("| `/services/it` | `/en/services/it` | `#cases` — стабільний ID блоку всіх кейсів |");
routeMap.push("| `/services/design` | `/en/services/design` | |");
routeMap.push("| `/services/video` | `/en/services/video` | |");
routeMap.push("");
routeMap.push("Redirect: 301/308; фрагмент у `Location` не передається сервером — браузер зберігає фрагмент запиту; перевірка скролу — ручна (Chromium + WebKit).");
fs.writeFileSync(path.join(OUT, "routes.md"), routeMap.join("\n"));

fs.writeFileSync(path.join(OUT, "issues.json"), JSON.stringify(issues, null, 2));

/* console summary */
const byType = {};
for (const i of issues) byType[i.type] = (byType[i.type] || 0) + 1;
console.log(JSON.stringify(report.counts, null, 2));
console.log("issues:", issues.length, JSON.stringify(byType));
console.log(`expectations: ${expectations.length} entries (${expectations.filter((e) => e.phase === "current").length} current, ${expectations.filter((e) => e.phase === "target").length} target)`);
console.log(`manual review: ${flagged.length} cases`);
