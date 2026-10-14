// Package 4 migration tool: draft a case record from the original page.
//
//   node scripts/migrate-case.mjs --id it/asandra-soul [--id …] [--dry-run]
//   node scripts/migrate-case.mjs --dir it --limit 12
//
// What it does per case (only for cases that are NOT in the registry yet):
//   1. reads the original `app/(uk)/cases/{direction}/{slug}/page.tsx` (and its
//      layout) — the source of truth for media, blocks, links and captions;
//   2. maps it onto the shared record schema (brief / featureList+slider /
//      results / review kinds video·screenshot·audio·text / team / back link);
//   3. writes `data/case-records/{direction}/{slug}.ts` with **editorial
//      placeholders** for H1 and SEO title that a human has to replace;
//   4. replaces the UA page with the thin shell, creates the EN page and
//      removes the UA layout (metadata moves to `generateMetadata`).
//
// It never invents copy: everything that is not a placeholder is taken from
// the page, the dictionary or the card entry. Anything it cannot map is
// printed as `ATTENTION` so the migration can be reviewed case by case.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
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

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const DRY = args.includes("--dry-run");
const SURVEY = args.includes("--survey");
const FORCE = args.includes("--force");
const ids = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--id" && args[i + 1]) ids.push(args[i + 1]);
}
const dirArg = arg("--dir", null);
const limit = Number(arg("--limit", "0"));

const ROOT = process.cwd();
const registry = await import(pathToFileURL(path.join(ROOT, "data/case-records/index.ts")).href);
const { translations } = await import(pathToFileURL(path.join(ROOT, "lib/i18n.ts")).href);
const itCases = (await import(pathToFileURL(path.join(ROOT, "data/itCases.ts")).href)).itCases;
const designCases = (await import(pathToFileURL(path.join(ROOT, "data/designCases.ts")).href)).designCases;
const videoCases = (await import(pathToFileURL(path.join(ROOT, "data/videoCases.ts")).href)).videoCases;

const cards = {
  it: itCases.map((c) => ({ ...c, direction: "it" })),
  design: designCases.map((c) => ({ ...c, direction: "design" })),
  video: videoCases.map((c) => ({ ...c, direction: "video" })),
};
const cardOf = (direction, slug) => cards[direction].find((c) => c.slug === slug) ?? null;
const subcategoryOf = (card) => card?.itCategory ?? card?.category ?? card?.subCategory ?? "";

const camel = (slug) =>
  slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((part, i) => (i === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join("");

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);

/* ─────────────────────── source parsing helpers ─────────────────────── */

/** Top-level `const NAME = [ … ]` arrays with their bodies. */
function topLevelArrays(src) {
  const out = [];
  // Plain arrays and `new Set([ … ])` constants: a Set of media paths is not
  // a content block, but it must be recognized (the original pages use it to
  // drive responsive presentation through `.has()`).
  const re = /^const\s+([A-Za-z0-9_]+)(?:\s*:[^=]+)?\s*=\s*(?:new\s+Set\s*\(\s*)?\[/gm;
  let m;
  while ((m = re.exec(src))) {
    const open = src.indexOf("[", m.index + m[0].length - 1);
    if (open < 0) continue;
    let depth = 0;
    let inStr = false;
    let esc = false;
    let end = -1;
    for (let i = open; i < src.length; i++) {
      const ch = src[i];
      if (esc) { esc = false; continue; }
      if (ch === "\\") { esc = true; continue; }
      if (inStr) { if (ch === '"') inStr = false; continue; }
      if (ch === '"') { inStr = true; continue; }
      if (ch === "[") depth++;
      else if (ch === "]") { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end < 0) continue;
    out.push({ name: m[1], body: src.slice(open + 1, end), isSet: !!m[2] });
  }
  return out;
}

/**
 * `const NAME = [ … ]` arrays declared INSIDE the component (indented). The
 * top-level mapper cannot see them; when they carry media or i18n keys they
 * hold real content (e.g. moto-school's scene "details") that a write would
 * silently drop — so both the survey and the write path must refuse.
 */
function componentScopeArrays(page) {
  const out = [];
  const re = /^[ \t]+const\s+([A-Za-z0-9_]+)\s*(?::[^=]+)?=\s*\[/gm;
  let m;
  while ((m = re.exec(page))) {
    const open = page.indexOf("[", m.index);
    if (open < 0) continue;
    let depth = 0;
    let end = -1;
    for (let i = open; i < page.length; i++) {
      const ch = page[i];
      if (ch === "[") depth++;
      else if (ch === "]") {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end < 0) continue;
    const body = page.slice(open + 1, end);
    if (/\/media\//.test(body) || /"[a-z]+Cases\./.test(body)) {
      out.push({ name: m[1], media: /\/media\//.test(body), keys: /"[a-z]+Cases\./.test(body) });
    }
  }
  return out;
}

/** Split an array body into top-level `{ … }` objects and `"…"` strings. */
function splitItems(body) {
  const items = [];
  let depth = 0;
  let inStr = false;
  let esc = false;
  let cur = "";
  for (const ch of body) {
    if (esc) { cur += ch; esc = false; continue; }
    if (ch === "\\") { cur += ch; esc = true; continue; }
    if (inStr) { cur += ch; if (ch === '"') inStr = false; continue; }
    if (ch === '"') { inStr = true; cur += ch; continue; }
    if (ch === "{" || ch === "[") depth++;
    if (ch === "}" || ch === "]") depth--;
    if (ch === "," && depth === 0) { if (cur.trim()) items.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) items.push(cur.trim());
  return items;
}

const field = (raw, key) => raw.match(new RegExp(`\\b${key}:\\s*"([^"]*)"`))?.[1] ?? null;
const list = (raw, key) => {
  const m = raw.match(new RegExp(`\\b${key}:\\s*\\[([\\s\\S]*?)\\]`));
  return m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]) : null;
};
const keysIn = (src, re) => [...src.matchAll(re)].map((m) => m[1]);

/** Top-level `const NAME = "value";` — pages keep some URLs behind them. */
function sourceConstants(src) {
  const map = {};
  for (const m of src.matchAll(/^const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"([^"]*)"/gm)) map[m[1]] = m[2];
  return map;
}

const caseKeys = (src) => [
  ...new Set(src.match(/["']((?:itCases|designCases|videoCases)(?:\.[A-Za-z0-9_]+)+)["']/g)?.map((k) => k.slice(1, -1)) ?? []),
];

/* ─────────────────── structural survey / blockers ─────────────────── */

/**
 * What a top-level array is, and whether the shared schema already has a
 * block for it. Anything `supported: false` is an UNMAPPED block: the tool
 * refuses to write a record for such a page instead of dropping the content
 * silently (Package 4 rule: unclear blocks are never skipped).
 */
function classifyArray(name, body, isSet = false) {
  const hasMedia = /\/media\//.test(body);
  const hasKeys = /"[a-z]+Cases\./.test(body);
  if (isSet && hasMedia) {
    // `const mobileSplitItems = new Set([…])` — consumed through `.has()`
    // to drive the responsive presentation, never rendered as its own block.
    return { kind: "mediaSet", supported: true, note: "Set of media paths consumed via .has() (responsive/presentation logic)" };
  }
  if (/titleKey:/.test(body) && /(images:|sliderBefore:|sliderAfter:|image:)/.test(body)) {
    return { kind: "featureList", supported: true, note: "components with images/slider" };
  }
  if (/(sliderBefore:|sliderAfter:|\bbefore:\s*"\/media\/)/.test(body) && /(after:\s*"\/media\/|sliderAfter:)/.test(body)) {
    return { kind: "compare", supported: true, note: "before/after pairs → `compare`" };
  }
  if (/src:/.test(body) && /(poster:|duration:|preview:)/.test(body)) {
    // The tile is more than a file: the original pages wrap it in a play
    // button that opens the fullscreen player and carry duration/format
    // badges. The schema models all of that (`VideoGridItem` +
    // `FullscreenVideo`), and the section mapper writes it below.
    return {
      kind: "videoGrid",
      supported: true,
      note: "video tiles: file + poster + duration/format badges → schema `videoGrid` (playable tile + fullscreen player)",
    };
  }
  if (/src:/.test(body) || /\bsrc\s*:/.test(body)) {
    // An array of `{ src, alt/title/caption }` image objects is a gallery —
    // the design pages call it finalItems/galleryItems, the video pages call
    // it `screenshots`. Any name maps to the shared `gallery` section.
    return { kind: "gallery", supported: true, note: "image gallery → `gallery`" };
  }
  if (hasMedia) {
    return name === "heroImages"
      ? { kind: "mediaList", supported: true, note: "hero image grid → hero `imageGrid`" }
      : { kind: "mediaList", supported: false, note: "flat media list" };
  }
  if (hasKeys && /result/i.test(name)) return { kind: "results", supported: true, note: "results list" };
  if (/group/i.test(name) && body.includes("items:")) {
    return { kind: "indexGroups", supported: true, note: "grouped gallery → `gallery` sections" };
  }
  if (hasKeys && /approach/i.test(name)) return { kind: "checklist", supported: true, note: "approach checklist → `checklist`" };
  if (hasKeys) return { kind: "textList", supported: false, note: "text list that is not `results`/`approach`" };
  return { kind: "unknown", supported: !hasMedia && !hasKeys, note: "no media, no keys" };
}

/** Inline JSX media grids (`{[ {src, poster}, … ].map(…)}`) are not top-level
 *  consts, so they need their own detection — video pages are full of them. */
function inlineJsxMedia(src) {
  const out = [];
  const re = /\{\[([\s\S]{0,2000}?)\]\s*\.map/g;
  let m;
  while ((m = re.exec(src))) {
    const media = [...m[1].matchAll(/["'`](\/media\/[^"'`\s?#]+)/g)].map((x) => x[1]);
    if (media.length) out.push({ at: m.index, media });
  }
  return out;
}

/** Position of the array's RENDER (`{name.map(` in JSX) — not its use in the
 *  data section (`const allImages = name.map(…)`), which sits at the top. */
function renderPos(page, arrayName) {
  const at = page.indexOf(`{${arrayName}.map(`);
  return at < 0 ? -1 : at;
}

/**
 * Position of the RENDER that carries the block's own heading. An array can be
 * mapped several times (hero grid, then the gallery); the heading tells which
 * one is the section we are mapping.
 */
function renderPosWithHeading(page, arrayName, span = 900) {
  const first = renderPos(page, arrayName);
  if (first < 0) return -1;
  let at = first;
  let best = -1;
  while (at >= 0) {
    const seg = page.slice(Math.max(0, at - span), at);
    if (/[t(]"([A-Za-z0-9_.]+)"/.test(seg) === false && /t\("([A-Za-z0-9_.]+Title)"\)/.test(seg)) best = at;
    if (/t\("[A-Za-z0-9_.]+Title"\)/.test(seg)) return at;
    at = page.indexOf(`{${arrayName}.map(`, at + 1);
  }
  return best >= 0 ? best : first;
}

/** Nearest `…Title` / `…Intro` dictionary keys rendered just before an
 *  array's `.map(` — the heading of that block on the original page. Also
 *  captures a literal `<h2>`/`<p>` heading that is not a dictionary key (the
 *  video pages hard-code headings such as "Кадри з відео"). */
function headingBefore(page, arrayName, span = 900) {
  const at = renderPos(page, arrayName);
  if (at < 0) return { titleKey: null, introKey: null, titleLiteral: null, pos: -1 };
  const seg = page.slice(Math.max(0, at - span), at);
  const keys = [...seg.matchAll(/t\("([A-Za-z0-9_.]+)"\)/g)].map((m) => m[1]);
  const fromEnd = [...keys].reverse();
  const titleKey = fromEnd.find((k) => /Title$/.test(k)) ?? null;
  const introKey = fromEnd.find((k) => /(Intro|Desc)$/.test(k)) ?? null;
  // A literal heading: the last `<h2 …>TEXT</h2>` (or `<h2>{`TEXT`}</h2>`)
  // before the map, when no dictionary Title key was found.
  let titleLiteral = null;
  if (!titleKey) {
    const h2 = [...seg.matchAll(/<h2[^>]*>([\s\S]{1,200}?)<\/h2>/g)];
    const last = h2[h2.length - 1];
    if (last) {
      const text = last[1]
        .replace(/\{[^}]*\}/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (text) titleLiteral = text;
    }
  }
  return { titleKey, introKey, titleLiteral, pos: at };
}

/** Column count of the grid that wraps a `.map(` call. */
function columnsBefore(page, arrayName, span = 2500) {
  const at = renderPos(page, arrayName);
  if (at < 0) return null;
  const seg = page.slice(Math.max(0, at - span), at);
  if (/md:grid-cols-3/.test(seg)) return 3;
  if (/md:grid-cols-2/.test(seg)) return 2;
  if (/grid-cols-1/.test(seg)) return 1;
  return null;
}

const numField = (raw, key) => Number(raw.match(new RegExp(`\\b${key}:\\s*(\\d+)`))?.[1]) || null;

/** Read-only structural profile of one page (used by `--survey` and by the
 *  write path's blocker check). */
function surveyPage(direction, slug) {
  const pagePath = path.join(ROOT, "app/(uk)/cases", direction, slug, "page.tsx");
  const page = read(pagePath);
  if (!page) return { id: `${direction}/${slug}`, error: `no page at ${pagePath}` };
  const arrays = topLevelArrays(page).map((a) => ({ name: a.name, ...classifyArray(a.name, a.body, a.isSet) }));
  const inline = inlineJsxMedia(page);
  const constants = sourceConstants(page);
  const heroBlock = (() => {
    const at = page.search(/ref=\{heroRef\}/);
    if (at < 0) return "none";
    const closeAt = page.indexOf("</section>", at);
    const seg = page.slice(at, Math.min(closeAt < 0 ? at + 12000 : closeAt, at + 12000));
    // A hero GRID of video tiles, identified by the ARRAY it maps (the tiles
    // themselves use `src={v.src}` / `src={helper(src)}` variables, so the
    // literal-src test below would miss them). Checked before single video.
    const inlineArr = seg.match(/\{\s*\[[\s\S]{0,1200}?\]\s*\.map/);
    const sliceArr = seg.match(/\{([A-Za-z0-9_]+)\.slice\([^)]*\)\.map\(/);
    if (inlineArr && /<video[\s\S]{0,600}?src=\{/.test(seg)) {
      const n = [...inlineArr[0].matchAll(/["'`](\/media\/[^"'`\s?#]+)/g)].map((m) => m[1]).filter((s, i, a) => a.indexOf(s) === i).length;
      if (n > 1) return `videoGrid(${n})`;
    }
    if (sliceArr) {
      const arr = topLevelArrays(page).find((a) => a.name === sliceArr[1]);
      const n = arr ? (arr.body.match(/src:/g) ?? []).length : 0;
      if (n > 1) return `videoGrid(${n})`;
    }
    // A single hero video tile, whether the src is a literal or a template.
    if (/<video[\s\S]{0,400}?src=(?:"\/media\/|\{`)/.test(seg)) {
      const interactive = /openFullscreen|setFullscreen|FullscreenVideo|<Play\b/.test(seg);
      const badges = [
        />\s*(9:16|16:9|1:1)\s*</.test(seg) ? "format" : null,
        />\s*~\d+\s*(?:сек|sec|secs|s|с)\s*</.test(seg) ? "duration" : null,
      ].filter(Boolean);
      return `video${interactive ? "(player)" : "(static)"}${badges.length ? `+${badges.join("+")}` : ""}`;
    }
    if (/src=\{[A-Z][A-Z0-9_]*\}/.test(seg) && /<Image[\s\S]{0,300}?src=\{/.test(seg)) return "image";
    const literals = seg.match(/<Image[\s\S]{0,500}?src="(?:https?:\/\/[^"]+)?\/media\/[^"?#]+/g) ?? [];
    if (literals.length > 1) return `imageGrid(${literals.length})`;
    if (literals.length === 1) return "image";
    // `{heroImages.map((src, …)}` — a top-level media array drives the hero
    const mapped = seg.match(/\{([A-Za-z0-9_]+)\.map\(/);
    if (mapped && new RegExp(`const\\s+${mapped[1]}[\\s\\S]{0,400}?/media/`).test(page)) {
      return `imageGrid(${mapped[1]})`;
    }
    // `<Image src={artwork} />` where `artwork` is a top-level media constant
    const constName = seg.match(/src=\{([A-Za-z_][A-Za-z0-9_]*)\}/)?.[1];
    if (constName && new RegExp(`const\\s+${constName}\\s*=\\s*"/media/`).test(page)) return "image";
    if (/\{\[\s*\{\s*src:/.test(seg)) return "videoGrid";
    return "unknown";
  })();
  const hasAudio = /<audio[\s\S]{0,400}?src="\/media\//.test(page);
  const hasVideo = /<video[\s\S]{0,400}?src="\/media\//.test(page);
  const reviewKeys = caseKeys(page).filter((k) => /review/i.test(k));
  // Same rule as the write path: a standalone media element outside the hero
  // and the review has no place in the shared schema.
  const reviewAt = page.search(/reviewTitle|"itCases\.review"|<Quote/);
  const reviewStart = reviewAt < 0 ? -1 : page.lastIndexOf("<section", reviewAt);
  const reviewEnd = reviewAt < 0 ? -1 : page.indexOf("</section>", reviewAt);
  const heroAt = page.search(/ref=\{heroRef\}/);
  const heroStart = heroAt < 0 ? -1 : heroAt;
  const heroCloseAt = heroAt < 0 ? -1 : page.indexOf("</section>", heroAt);
  const heroEnd = heroAt < 0 ? -1 : Math.min(heroCloseAt < 0 ? heroAt + 12000 : heroCloseAt, heroAt + 12000);
  const inHero = (at) => heroStart >= 0 && at >= heroStart && at < heroEnd;
  const uncovered = [...page.matchAll(/<(?:Image|video)[\s\S]{0,300}?src="((?:https?:\/\/[^"]+)?\/media\/[^"?#]+)/g)].filter((m) => {
    const at = m.index;
    const inReview = reviewStart >= 0 && at >= reviewStart && at < reviewEnd;
    return !inHero(at) && !inReview;
  });
  // An inline JSX media array INSIDE the hero becomes the hero videoGrid — it
  // is not an unmapped blocker. Only body-area inline arrays are a problem.
  const bodyInline = inline.filter((i) => !inHero(i.at));
  const unmapped = arrays.filter((a) => !a.supported);
  const blockers = [];
  if (uncovered.length) {
    blockers.push(
      `${uncovered.length} inline media element(s) outside hero/review ` +
        `(${uncovered.slice(0, 3).map((m) => m[1].split("/").pop()).join(", ")}) — not mapped`,
    );
  }
  for (const a of unmapped) blockers.push(`array "${a.name}" → ${a.kind} (${a.note})`);
  for (const a of componentScopeArrays(page)) {
    blockers.push(
      `component-scope array "${a.name}" (${a.media ? "media" : "keys"}) — invisible to the top-level mapper; its content would be dropped`,
    );
  }
  const templateKeys = [...page.matchAll(/t\(`([A-Za-z0-9_.]+)\$\{/g)].map((m) => m[1]);
  if (templateKeys.length) {
    blockers.push(
      `${templateKeys.length} template-literal i18n key(s) (e.g. "${templateKeys[0]}…") — dynamic keys cannot be mapped`,
    );
  }
  if (
    heroBlock !== "image" &&
    heroBlock !== "none" &&
    !heroBlock.startsWith("video") &&
    !heroBlock.startsWith("imageGrid")
  ) {
    blockers.push(`hero is ${heroBlock} — the mapper writes an image, image-grid or single-video hero only`);
  }
  if (bodyInline.length) blockers.push(`${bodyInline.length} inline JSX media array(s) (${bodyInline.reduce((n, i) => n + i.media.length, 0)} media) — not mapped`);
  return {
    id: `${direction}/${slug}`,
    arrays,
    inline,
    hero: heroBlock,
    review: hasAudio ? "audio" : hasVideo ? "video" : reviewKeys.length ? "text/screenshot(keys)" : "none",
    blockers,
    supported: blockers.length === 0,
  };
}

/* ─────────────────────── per-case migration ─────────────────────── */

function migrate(direction, slug) {
  const id = `${direction}/${slug}`;
  const attention = [];
  const blockers = [];
  const pagePath = path.join(ROOT, "app/(uk)/cases", direction, slug, "page.tsx");
  const layoutPath = path.join(ROOT, "app/(uk)/cases", direction, slug, "layout.tsx");
  const page = read(pagePath);
  if (!page) return { id, error: `no page at ${pagePath}` };

  const layout = read(layoutPath) ?? "";
  const card = cardOf(direction, slug);
  const keys = caseKeys(page);
  const arrays = topLevelArrays(page);
  const constants = sourceConstants(page);

  // ── meta ──────────────────────────────────────────────────────────────
  const layoutTitle = layout.match(/title:\s*"([^"]+)"/)?.[1] ?? null;
  const layoutDesc = layout.match(/description:\s*"([^"]+)"/)?.[1] ?? null;
  const layoutOg = layout.match(/images:\s*\[\s*"([^"]+)"/)?.[1] ?? null;

  const cardTitle = card?.titleKey ? translations.uk[card.titleKey] ?? null : null;
  const cardTitleEn = card?.titleKey ? translations.en[card.titleKey] ?? null : null;
  const cardDesc = card?.descriptionKey ? translations.uk[card.descriptionKey] ?? null : null;
  const cardDescEn = card?.descriptionKey ? translations.en[card.descriptionKey] ?? null : null;

  const seoTitle = layoutTitle ?? (cardTitle ? `${cardTitle} | Freelance UA` : null);
  if (!layoutTitle) attention.push("layout title not found — write SEO title manually");
  const seoDescription = layoutDesc && cardDesc && layoutDesc === cardDesc
    ? { key: card?.descriptionKey }
    : layoutDesc
      ? { literal: layoutDesc }
      : card?.descriptionKey
        ? { key: card.descriptionKey }
        : null;
  if (seoDescription?.literal) attention.push("SEO description has no EN twin in the dictionary — translate it");
  if (!layoutOg) attention.push("layout has no og:image — check the cover");

  // ── hero, glow, badge ────────────────────────────────────────────────
  const heroAt = page.search(/ref=\{heroRef\}/);
  const heroStart = heroAt < 0 ? -1 : heroAt;
  const heroCloseAt = heroAt < 0 ? -1 : page.indexOf("</section>", heroAt);
  const heroEnd = heroAt < 0 ? -1 : Math.min(heroCloseAt < 0 ? heroAt + 12000 : heroCloseAt, heroAt + 12000);
  const heroSeg = heroAt < 0 ? "" : page.slice(heroAt, heroEnd);
  // A video src may be a literal, a `${CONST}#t=0.2` template, or a helper
  // call over an inline array — resolve all three to a clean `/media/…` path.
  const cleanVideoSrc = (raw) => {
    if (!raw) return null;
    let value = raw;
    value = value.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (m, name) => constants[name] ?? "");
    value = value.replace(/^["'`] | ["'`]$/g, "");
    value = value.split("#")[0].split("?")[0];
    return /^\/media\//.test(value) ? value : null;
  };
  const heroTag = heroSeg.match(/<video[\s\S]{0,900}?\/>(?![\s\S]*<video)/) ?? null;
  const heroLiteral = heroSeg.match(/src="((?:https?:\/\/[^"]+)?\/media\/[^"?#]+)(?:[?#][^"]*)?"/);
  const heroConstName = heroSeg.match(/src=\{([A-Za-z_][A-Za-z0-9_]*)\}/)?.[1] ?? null;
  const heroConstValue = heroConstName ? constants[heroConstName] ?? null : null;
  const heroMappedName = heroSeg.match(/\{([A-Za-z0-9_]+)\.map\(/)?.[1] ?? null;
  const heroMapped = heroMappedName ? arrays.find((a) => a.name === heroMappedName) : null;
  let heroBlock = null;
  // A hero that maps an INLINE array of video paths into tiles
  // (`{["/media/…1.mp4", …].map(src => <video …>)}`) → hero videoGrid.
  const heroInlineArray = heroSeg.match(/\{\s*\[([\s\S]{0,1200}?)\]\s*\.map/);
  if (!heroBlock && heroInlineArray && /<video[\s\S]{0,400}?src=\{/.test(heroSeg)) {
    const srcs = [...heroInlineArray[1].matchAll(/["'`](\/media\/[^"'`\s?#]+)/g)]
      .map((m) => m[1])
      .filter((s, i, arr) => arr.indexOf(s) === i);
    if (srcs.length > 1) {
      const formatBadge = heroSeg.match(/>\s*(9:16|16:9|1:1)\s*</)?.[1] ?? null;
      heroBlock = { kind: "videoGrid", items: srcs.map((src) => ({ src, format: formatBadge })), ratio: "9/16" };
    }
  }
  // A hero with SEVERAL `<video>` tiles side by side (ai-avatars renders three
  // separate `<video>` tags in a grid) → hero videoGrid with every tile, not
  // just the last one the single-video regex would match.
  if (!heroBlock) {
    const videoTags = [...heroSeg.matchAll(/<video[\s\S]{0,900}?\/>/g)];
    if (videoTags.length > 1) {
      const seen = new Set();
      const tiles = videoTags
        .map((tag) => {
          const src = cleanVideoSrc(
            tag[0].match(/src="([^"]+)"/)?.[1] ?? tag[0].match(/src=\{`([^`]+)`\}/)?.[1] ?? null,
          );
          const poster = tag[0].match(/poster="([^"]+)"/)?.[1] ?? null;
          return src && !seen.has(src) ? (seen.add(src), { src, poster }) : null;
        })
        .filter(Boolean);
      if (tiles.length > 1) {
        const formatBadge = heroSeg.match(/>\s*(9:16|16:9|1:1)\s*</)?.[1] ?? null;
        heroBlock = { kind: "videoGrid", items: tiles.map((t) => ({ ...t, format: formatBadge })), ratio: "9/16" };
      }
    }
  }
  // A named video array sliced into hero tiles (`videos.slice(0, 3).map`).
  // The array is consumed by the hero — the section loop must not emit it a
  // second time, or the same files would render twice.
  let heroConsumedArray = null;
  if (!heroBlock) {
    const sliceRef = heroSeg.match(/\{([A-Za-z0-9_]+)\.slice\([^)]*\)\.map\(/);
    if (sliceRef) {
      const arr = arrays.find((a) => a.name === sliceRef[1]);
      if (arr && /src:/.test(arr.body) && /(poster:|duration:|label:|format:)/.test(arr.body)) {
        const seen = new Set();
        const items = splitItems(arr.body)
          .map((raw) => {
            const src = field(raw, "src");
            if (!src || seen.has(src)) return null;
            seen.add(src);
            return { src, poster: field(raw, "poster"), labelLiteral: field(raw, "label"), durationLiteral: field(raw, "duration"), format: field(raw, "format") };
          })
          .filter(Boolean);
        if (items.length > 1) {
          heroBlock = { kind: "videoGrid", items, ratio: "9/16", fromSlice: true };
          heroConsumedArray = arr.name;
        }
      }
    }
  }
  if (heroTag && !heroBlock) {
    const srcRaw =
      heroTag[0].match(/src="([^"]+)"/)?.[1] ??
      heroTag[0].match(/src=\{`([^`]+)`\}/)?.[1] ??
      null;
    const src = cleanVideoSrc(srcRaw);
    const poster = heroTag[0].match(/poster="([^"]+)"/)?.[1] ?? null;
    const w = heroTag[0].match(/width={(\d+)}/)?.[1] ?? null;
    const h = heroTag[0].match(/height={(\d+)}/)?.[1] ?? null;
    // The thumb is a CLICKABLE wrapper around the <video>: the play overlay,
    // the fullscreen-player opener and the duration/format badges sit NEXT TO
    // the tag, so they are read from the whole hero segment — not from the
    // <video> element alone.
    const formatBadge = heroSeg.match(/>\s*(9:16|16:9|1:1)\s*</)?.[1] ?? null;
    const durationBadge =
      heroSeg.match(/>\s*(~\d+\s*(?:сек|секунд|sec|secs|s|с)|\d+\s*сек)\s*</)?.[1]?.trim() ?? null;
    const opensPlayer =
      /openFullscreen|setFullscreen|FullscreenVideo|role="dialog"/.test(heroSeg) ||
      /<Play\b/.test(heroSeg);
    if (src) {
      // A separate full file the player opens while the tile shows a lighter
      // preview (`openFullscreen("…-full.mp4")` next to `src="…preview…"`).
      const fullscreenArg = heroSeg.match(/openFullscreen\(\s*"([^"]+)"\s*\)/)?.[1] ?? null;
      const fullClean = cleanVideoSrc(fullscreenArg);
      const fullSrc = fullClean && fullClean !== src ? fullClean : null;
      heroBlock = {
        kind: "video",
        src,
        poster,
        fullSrc,
        w: w ? Number(w) : null,
        h: h ? Number(h) : null,
        duration: durationBadge,
        format: formatBadge,
        opensPlayer,
      };
    }
  }
  const heroLiterals = [...heroSeg.matchAll(/<Image[\s\S]{0,500}?src="((?:https?:\/\/[^"]+)?\/media\/[^"?#]+)(?:[?#][^"]*)?"[^>]*>/g)].map((m) => {
    const tag = m[0];
    return {
      src: m[1],
      w: tag.match(/width={(\d+)}/)?.[1] ? Number(tag.match(/width={(\d+)}/)[1]) : null,
      h: tag.match(/height={(\d+)}/)?.[1] ? Number(tag.match(/height={(\d+)}/)[1]) : null,
      altKey: tag.match(/alt=\{t\("([^"]+)"\)\}/)?.[1] ?? null,
    };
  });
  if (!heroBlock && heroLiterals.length > 1) {
    heroBlock = { kind: "imageGrid", items: heroLiterals };
  } else if (!heroBlock && heroLiteral) {
    heroBlock = { kind: "image", src: heroLiteral[1] };
  }
  if (!heroBlock && heroConstValue && /^\/media\//.test(heroConstValue)) {
    heroBlock = { kind: "image", src: heroConstValue };
  }
  if (!heroBlock && heroMapped && /\/media\//.test(heroMapped.body)) {
    // Items may be plain paths or `{ src, w, h, titleKey … }` objects; the
    // hero shows each file once (a responsive page repeats them per
    // breakpoint — duplicates would render side by side in our grid).
    const seen = new Set();
    const items = splitItems(heroMapped.body)
      .map((raw) => {
        if (raw.startsWith('"')) {
          const value = raw.replace(/^"|"$/g, "").trim();
          return value.startsWith("/media/") ? { src: value, w: null, h: null, altKey: null } : null;
        }
        const src = field(raw, "src");
        if (!src) return null;
        return {
          src,
          w: numField(raw, "w"),
          h: numField(raw, "h"),
          altKey: field(raw, "titleKey") ?? null,
        };
      })
      .filter((item) => item && item.src.startsWith("/media/"))
      .filter((item) => (seen.has(item.src) ? false : (seen.add(item.src), true)));
    heroBlock = { kind: "imageGrid", items };
  }
  const heroSrc = heroBlock?.kind === "image" ? heroBlock.src : card?.image ?? null;
  if (!heroBlock) attention.push("hero image not detected — fell back to the card image");

  const glow = page.match(/["']--case-glow["']:\s*"([^"]+)"/)?.[1] ?? card?.glowColor ?? null;
  const glowStrong = page.match(/["']--case-glow-strong["']:\s*"([^"]+)"/)?.[1] ?? card?.glowColorStrong ?? null;

  // ── lead (the paragraph right under the H1) ──────────────────────────
  const leadMatch = page.match(/<\/h1>[\s\S]{0,600}?\{t\("((?:itCases|designCases|videoCases)\.[^"]+)"\)\}/);
  const leadKey = leadMatch?.[1] ?? null;

  // ── brief ────────────────────────────────────────────────────────────
  const middleKey = (suffix) =>
    keys.find((k) => new RegExp(`^[a-z]+Cases\\.[A-Za-z0-9_]+\\.${suffix}$`).test(k)) ?? null;
  const taskKey = middleKey("challenge");
  const solutionKey = middleKey("solution");
  const taskTitleKey = middleKey("challengeTitle");
  const solutionTitleKey = middleKey("solutionTitle");

  // ── components (featureList, with an optional built-in slider) ───────
  const resolve = (value) => {
    if (value == null) return null;
    const trimmed = value.trim();
    if (constants[trimmed] !== undefined) return constants[trimmed];
    return trimmed;
  };
  const componentsArray = arrays.find((a) =>
    a.body.includes("titleKey") && (a.body.includes("images:") || a.body.includes("sliderBefore") || a.body.includes("image:")),
  );
  const featureItems = [];
  if (componentsArray) {
    for (const raw of splitItems(componentsArray.body)) {
      const titleKey = field(raw, "titleKey");
      const descKey = field(raw, "descKey");
      const images = list(raw, "images");
      const singleImage = field(raw, "image");
      const sliderBefore = field(raw, "sliderBefore");
      const sliderAfter = field(raw, "sliderAfter");
      const link = resolve(field(raw, "link"));
      const linkLabelKey = field(raw, "linkLabelKey");
      if (!titleKey) { attention.push(`components item without titleKey in ${componentsArray.name}`); continue; }
      featureItems.push({
        titleKey,
        descKey,
        images: images ?? (singleImage ? [singleImage] : null),
        slider: sliderBefore && sliderAfter ? { before: sliderBefore.trim(), after: sliderAfter.trim() } : null,
        link: link && linkLabelKey ? { href: link.trim(), labelKey: linkLabelKey } : link ? { href: link.trim(), labelKey: null } : null,
      });
    }
  }

  // Structural check BEFORE anything is written: an unmapped block means the
  // shared schema cannot express this page yet — stop instead of dropping it.
  for (const a of topLevelArrays(page)) {
    if (/^(components|results)$/i.test(a.name)) continue;
    const classified = classifyArray(a.name, a.body, a.isSet);
    if (!classified.supported && (/\/media\//.test(a.body) || /"[a-z]+Cases\./.test(a.body))) {
      blockers.push(`array "${a.name}" → ${classified.kind} (${classified.note})`);
    }
  }
  for (const a of componentScopeArrays(page)) {
    blockers.push(
      `component-scope array "${a.name}" (${a.media ? "media" : "keys"}) — invisible to the top-level mapper; migrate this page by hand`,
    );
  }
  const templateKeys = [...page.matchAll(/t\(`([A-Za-z0-9_.]+)\$\{/g)].map((m) => m[1]);
  if (templateKeys.length) {
    blockers.push(
      `${templateKeys.length} template-literal i18n key(s) (e.g. "${templateKeys[0]}…") — dynamic keys cannot be mapped; migrate this page by hand`,
    );
  }
  // Component blocks that are NOT in a `components` array (standalone JSX
  // sections) — the mapper cannot place them, so the page must be migrated by
  // hand instead of being written without its content.
  if (!componentsArray && /\.component\d+(?:Title|Desc)["']/.test(page)) {
    blockers.push("component blocks exist outside a `components` array — migrate this page by hand");
  }
  // ── client-profile card (h2 clientName + role + desc [+ profile image]) ──
  // A recurring block on the video pages: a heading with the creator's name,
  // their role, a short description and often a social-profile screenshot.
  // Mapped to a `prose` block with the role as a subtitle and the image on top.
  const clientNameKey = keys.find((k) => /clientName$/.test(k)) ?? null;
  let clientCard = null;
  if (clientNameKey) {
    const clientRoleKey = keys.find((k) => /clientRole$/.test(k)) ?? null;
    const clientDescKey = keys.find((k) => /clientDesc$/.test(k)) ?? null;
    const at = page.indexOf(`"${clientNameKey}"`);
    // The profile screenshot sits BETWEEN the name heading and the role line —
    // search only that span so a nearby review screenshot is never mistaken
    // for the client image.
    const roleAt = clientRoleKey ? page.indexOf(`"${clientRoleKey}"`) : -1;
    const searchEnd = roleAt > at ? roleAt : at + 700;
    const segBetween = at >= 0 ? page.slice(at, searchEnd) : "";
    const imgTag = segBetween.match(/<Image[\s\S]{0,500}?src="((?:https?:\/\/[^"]+)?\/media\/[^"?#]+)[^>]*>/);
    clientCard = {
      pos: at >= 0 ? at : 0,
      titleKey: clientNameKey,
      subtitleKey: clientRoleKey,
      textKey: clientDescKey,
      image: imgTag
        ? {
            src: imgTag[1],
            at: at >= 0 ? at + imgTag.index : -1,
            w: numField(imgTag[0], "width"),
            h: numField(imgTag[0], "height"),
            altKey: imgTag[0].match(/alt=\{t\("([^"]+)"\)\}/)?.[1] ?? null,
            altLiteral: imgTag[0].match(/alt="([^"]+)"/)?.[1] ?? null,
          }
        : null,
    };
  }
  // Standalone <Image>/<video> with a literal media path that is neither the
  // hero, the review, nor the client-profile card: no place in the schema →
  // migrate by hand.
  const reviewAt = page.search(/reviewTitle|"itCases\.review"|<Quote/);
  const reviewStart = reviewAt < 0 ? -1 : page.lastIndexOf("<section", reviewAt);
  const reviewEnd = reviewAt < 0 ? -1 : page.indexOf("</section>", reviewAt);
  const clientImgAt = clientCard?.image?.at ?? -1;
  const uncovered = [...page.matchAll(/<(?:Image|video)[\s\S]{0,300}?src="((?:https?:\/\/[^"]+)?\/media\/[^"?#]+)/g)].filter((m) => {
    const at = m.index;
    const inHero = heroStart >= 0 && at >= heroStart && at < heroEnd;
    const inReview = reviewStart >= 0 && at >= reviewStart && at < reviewEnd;
    const isClientImg = clientImgAt >= 0 && at === clientImgAt;
    return !inHero && !inReview && !isClientImg;
  });
  if (uncovered.length) {
    blockers.push(
      `${uncovered.length} inline media element(s) outside hero/review ` +
        `(${uncovered.slice(0, 3).map((m) => m[1].split("/").pop()).join(", ")}) — not mapped`,
    );
  }

  const inlineMediaBlocks = inlineJsxMedia(page).filter((i) => !(heroStart >= 0 && i.at >= heroStart && i.at < heroEnd));
  if (inlineMediaBlocks.length) {
    blockers.push(`${inlineMediaBlocks.length} inline JSX media array(s) (${inlineMediaBlocks.reduce((n, i) => n + i.media.length, 0)} media) — not mapped`);
  }

  // ── results ──────────────────────────────────────────────────────────
  const resultsArray =
    arrays.find((a) => /result/i.test(a.name)) ??
    arrays.find((a) => !a.body.includes("{") && /"[a-z]+Cases\./.test(a.body)) ??
    null;
  const resultKeys = resultsArray ? splitItems(resultsArray.body).map((raw) => raw.replace(/^"|"$/g, "")) : [];
  const resultsTitleKey = keys.find((k) => /\.resultsTitle$/.test(k))
    ?? keysIn(page, /t\("((?:itCases|designCases|videoCases)\.results)"\)/g)[0]
    ?? null;

  // ── review ───────────────────────────────────────────────────────────
  const reviewAudio = page.match(/<audio[\s\S]{0,400}?src="(\/media\/[^"]+)"/);
  const reviewVideo = page.match(/<video[\s\S]{0,400}?src="(\/media\/testimonials\/[^"]+)"/);
  const reviewTitleKey =
    keys.find((k) => /\.reviewTitle$/.test(k)) ??
    keysIn(page, /t\("(itCases\.review)"\)/g)[0] ??
    null;
  const reviewTextKey = keys.find((k) => /\.reviewText$/.test(k)) ?? null;
  const reviewAuthorKey = keys.find((k) => /\.reviewAuthor$/.test(k)) ?? null;
  // Dedicated alt of the review screenshot, when the page spells it out.
  const reviewScreenshotAltKey = keys.find((k) => /reviewScreenshotAlt$/i.test(k)) ?? null;
  const reviewScreenshotCaptionKey = keys.find((k) => /reviewScreenshotCaption$/i.test(k)) ?? null;

  const reviewSection = (() => {
    const at = page.search(/reviewTitle|"itCases\.review"/);
    if (at < 0) return "";
    const start = page.lastIndexOf("<section", at);
    const end = page.indexOf("</section>", at);
    return start >= 0 && end > start ? page.slice(start, end) : "";
  })();
  const reviewImageMatch = reviewSection.match(/<Image[\s\S]{0,300}?src="(\/media\/[^"]+)"/);
  const reviewImageTag = reviewSection.match(/<Image[\s\S]{0,500}?\/>/)?.[0] ?? "";
  const reviewImageAltKey = reviewImageTag.match(/alt=\{t\("([^"]+)"\)\}/)?.[1] ?? null;
  const reviewImageAltText = reviewImageTag.match(/alt="([^"]+)"/)?.[1] ?? null;

  let review = null;
  if (reviewAudio) {
    review = {
      kind: "audio",
      src: reviewAudio[1],
      titleKey: reviewTitleKey,
      authorKey: reviewAuthorKey,
      caption: direction === "it" ? { uk: "Голосовий відгук", en: "Voice review" } : null,
      note: "audio caption literal — verify wording",
    };
  } else if (reviewVideo) {
    review = { kind: "video", src: reviewVideo[1], titleKey: reviewTitleKey };
  } else if (reviewImageMatch || reviewTextKey || reviewAuthorKey || reviewScreenshotAltKey) {
    // An image inside the review card turns it into a screenshot review —
    // even when the page has no text/author keys (image-only reviews).
    review = {
      kind: reviewImageMatch ? "screenshot" : "text",
      src: reviewImageMatch?.[1] ?? null,
      titleKey: reviewTitleKey,
      textKey: reviewTextKey,
      authorKey: reviewAuthorKey,
      altKey: reviewScreenshotAltKey ?? reviewImageAltKey,
      altLiteral: !reviewScreenshotAltKey && !reviewImageAltKey ? reviewImageAltText : null,
      captionKey: reviewScreenshotCaptionKey,
    };
    if (reviewImageMatch) {
      const size = reviewSection.match(/<Image[\s\S]{0,300}?width={(\d+)}[\s\S]{0,120}?height={(\d+)}/);
      review.w = size ? Number(size[1]) : undefined;
      review.h = size ? Number(size[2]) : undefined;
    }
  } else {
    attention.push("no review detected — confirm the page really has none");
  }
  if (review && !review.titleKey) attention.push("review has no heading in the original page (heading omitted)");
  if (review && review.kind === "text" && !review.textKey) attention.push("review text key not found");

  // ── team ─────────────────────────────────────────────────────────────
  const teamLabelKey = keys.find((k) => /projectTeam$/.test(k)) ?? null;
  const teamValueKey = keys.find((k) => /team\.[A-Za-z]|teamMember/.test(k) && !/projectTeam$/.test(k)) ?? null;

  // ── back to list ─────────────────────────────────────────────────────
  const backMatch = page.match(/href="([^"]+)"[\s\S]{0,300}?t\("([^"]*backToList[^"]*)"\)/);
  const backHref = backMatch?.[1] ?? null;
  const backLabelKey = backMatch?.[2] ?? null;
  if (!backMatch) attention.push("back-to-list link not detected");

  // ── external links outside the components array ──────────────────────
  const ctaUrl = "https://t.me/freelance_ua";
  const pageLinks = [
    ...new Set([
      ...[...page.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]),
      // href={CONST} where CONST holds a URL
      ...[...page.matchAll(/href=\{([A-Z][A-Z0-9_]*)\}/g)]
        .map((m) => constants[m[1]])
        .filter((v) => typeof v === "string" && /^https?:\/\//.test(v)),
    ]),
  ]
    .map((u) => u.trim())
    .filter((u) => u !== ctaUrl && !featureItems.some((i) => i.link?.href === u));
  // Label of each of those anchors: the dictionary key rendered inside it.
  const pageLinkLabels = pageLinks.map((url) => {
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Literal `href="…"` and `href={CONST}` alike: find the whole <a>…</a>.
    let anchor = new RegExp(`<a[\\s\\S]{0,600}?href="${escaped}"[\\s\\S]{0,800}?</a>`).exec(page);
    if (!anchor) {
      const names = Object.entries(constants)
        .filter(([, value]) => value === url)
        .map(([name]) => name);
      for (const name of names) {
        const m = new RegExp(`<a[\\s\\S]{0,600}?href=\\{${name}\\}[\\s\\S]{0,800}?</a>`).exec(page);
        if (m) {
          anchor = m;
          break;
        }
      }
    }
    const pos = anchor ? anchor.index : page.indexOf(url);
    // Label: the dictionary key rendered inside the anchor …
    let labelKey = anchor ? anchor[0].match(/t\("([^"]+)"\)/)?.[1] ?? null : null;
    let literalLabel = null;
    if (!labelKey && anchor) {
      // … or the literal text the anchor shows. Strip balanced `{…}`
      // placeholders (an `onClick={(e) => …}` has nested braces, so a naive
      // `[^}]*` would leave code fragments behind).
      const inner = anchor[0].replace(/^<a[^>]*>/, "").replace(/<\/a>$/, "");
      let text = "";
      let depth = 0;
      for (const ch of inner) {
        if (ch === "{") { depth++; continue; }
        if (ch === "}") { depth = Math.max(0, depth - 1); continue; }
        if (depth === 0) text += ch;
      }
      text = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").replace(/^[>\s]+/, "").replace(/e\.stopPropagation\(\)\s*>\s*/g, "").trim();
      if (text) literalLabel = text;
    }
    if (!labelKey && !literalLabel) {
      // Never assume `cases.visit` silently — the caller sees this attention.
      attention.push(`unrecognized label for link ${url} — falls back to "cases.visit"`);
      labelKey = "cases.visit";
    }
    // A promo card (heading + text above the link) — only outside the hero,
    // where a heading would otherwise be the H1 area.
    const inHero = heroStart >= 0 && pos >= heroStart && pos < heroEnd;
    const back = page.slice(Math.max(0, pos - 1200), pos);
    const backKeys = [...back.matchAll(/t\("([A-Za-z0-9_.]+)"\)/g)].map((m) => m[1]).reverse();
    const titleKey = !inHero ? backKeys.find((k) => /Title$/.test(k)) ?? null : null;
    const textKey = !inHero ? backKeys.find((k) => /(Desc|Intro)$/.test(k)) ?? null : null;
    const icon = /\bSend\b/.test(back) && /t\.me/.test(url) ? "telegram" : null;
    return {
      href: url,
      pos: pos < 0 ? 0 : pos,
      labelKey,
      literalLabel,
      titleKey,
      textKey,
      icon,
    };
  });

  /* ── design blocks: gallery / videoGrid / compare / checklist (source order) ── */
  const gallerySections = [];
  const videoGridSections = [];
  const compareSections = [];
  const checklistSections = [];
  let galleryGroupsSection = null;
  for (const a of arrays) {
    if (a.name === heroConsumedArray) continue; // already the hero grid
    const kind = classifyArray(a.name, a.body, a.isSet).kind;
    const pos = Math.max(renderPosWithHeading(page, a.name), 0);
    if (kind === "gallery") {
      const items = splitItems(a.body)
        .map((raw) => ({
          src: field(raw, "src"),
          w: numField(raw, "w"),
          h: numField(raw, "h"),
          titleKey: field(raw, "titleKey"),
          captionKey: field(raw, "captionKey"),
          altKey: field(raw, "altKey"),
          // Literal copy the page hard-codes per item (video screenshots).
          altLiteral: field(raw, "alt"),
          titleLiteral: field(raw, "title"),
          captionLiteral: field(raw, "caption"),
          wide: /\bwide:\s*true/.test(raw),
        }))
        .filter((item) => item.src);
      if (!items.length) continue;
      const head = headingBefore(page, a.name);
      // `wide` can be a data flag …
      const wideIndexes = new Set(items.map((item, index) => (item.wide ? index : -1)).filter((i) => i >= 0));
      // … or a condition in the render (`i === 3 || i === 7 ? "md:col-span-3"`).
      if (pos > 0) {
        for (const m of page.slice(pos, pos + 600).matchAll(/i\s*===\s*(\d+)/g)) {
          wideIndexes.add(Number(m[1]));
        }
      }
      gallerySections.push({
        name: a.name,
        pos: pos < 0 ? 0 : pos,
        titleKey: head.titleKey,
        titleLiteral: head.titleLiteral,
        introKey: head.introKey,
        columns: columnsBefore(page, a.name) ?? 1,
        items: items.map((item, index) => ({ ...item, wide: wideIndexes.has(index) })),
      });
    } else if (kind === "videoGrid") {
      const items = splitItems(a.body)
        .map((raw) => ({
          src: field(raw, "src"),
          poster: field(raw, "poster"),
          durationLiteral: field(raw, "duration"),
          format: field(raw, "format"),
          labelLiteral: field(raw, "label"),
          labelKey: field(raw, "labelKey"),
        }))
        .filter((item) => item.src);
      if (!items.length) continue;
      const head = headingBefore(page, a.name);
      videoGridSections.push({
        name: a.name,
        pos: pos < 0 ? 0 : pos,
        titleKey: head.titleKey,
        titleLiteral: head.titleLiteral,
        introKey: head.introKey,
        items,
      });
    } else if (kind === "compare") {
      const items = splitItems(a.body)
        .map((raw) => ({
          before: field(raw, "before"),
          after: field(raw, "after"),
          titleKey: field(raw, "titleKey"),
          captionKey: field(raw, "captionKey"),
        }))
        .filter((item) => item.before && item.after);
      if (!items.length) continue;
      const head = headingBefore(page, a.name);
      compareSections.push({
        name: a.name,
        pos: pos < 0 ? 0 : pos,
        titleKey: head.titleKey,
        introKey: head.introKey,
        items,
      });
    } else if (kind === "checklist") {
      const items = splitItems(a.body).map((raw) => raw.replace(/^"|"$/g, "").trim()).filter((k) => k.includes("."));
      if (!items.length) continue;
      const head = headingBefore(page, a.name);
      checklistSections.push({
        name: a.name,
        pos: pos < 0 ? 0 : pos,
        titleKey: head.titleKey,
        introKey: head.introKey,
        columns: columnsBefore(page, a.name) === 2 ? 2 : undefined,
        items,
      });
    }
  }

  // `finalGroups` = grouped galleries: `{ titleKey, introKey, items: [indexes] }`
  // over another media array. Each group becomes its own `gallery` section —
  // the same images, in the same order, under their own heading.
  const groupsArray = arrays.find((a) => /group/i.test(a.name) && a.body.includes("items:"));
  if (groupsArray) {
    const groupItems = splitItems(groupsArray.body)
      .map((raw) => ({
        titleKey: field(raw, "titleKey"),
        introKey: field(raw, "introKey"),
        indexes: (raw.match(/items:\s*\[([\s\S]*?)\]/)?.[1] ?? "")
          .split(",")
          .map((n) => Number(n.trim()))
          .filter((n) => Number.isInteger(n)),
      }))
      .filter((g) => g.indexes.length);
    const maxIndex = Math.max(0, ...groupItems.flatMap((g) => g.indexes));
    const sourceArray = arrays.find(
      (a) => a.name !== groupsArray.name && /src:/.test(a.body) && splitItems(a.body).length > maxIndex,
    );
    if (sourceArray && groupItems.length) {
      const sourceItems = splitItems(sourceArray.body)
        .map((raw) => ({
          src: field(raw, "src"),
          w: numField(raw, "w"),
          h: numField(raw, "h"),
          titleKey: field(raw, "titleKey"),
          captionKey: field(raw, "captionKey"),
        }))
        .filter((item) => item.src);
      const groupPos = Math.max(renderPos(page, groupsArray.name), 0);
      const head = headingBefore(page, groupsArray.name);
      const groups = groupItems
        .map((group) => ({
          items: group.indexes.map((i) => sourceItems[i]).filter(Boolean),
          titleKey: group.titleKey,
          introKey: group.introKey,
        }))
        .filter((g) => g.items.length);
      if (groups.length) {
        galleryGroupsSection = { pos: groupPos, titleKey: head.titleKey, introKey: head.introKey, groups };
      }
    } else if (groupItems.length) {
      blockers.push(`group array "${groupsArray.name}" without a resolvable source array — migrate by hand`);
    }
  }

  const out = [];
  const push = (line = "") => out.push(line);

  push(`import { key, text, type CaseRecord } from "../types";`);
  push();
  push(`/**`);
  push(` * ${id} — draft produced by scripts/migrate-case.mjs from the original page.`);
  push(` * Media, blocks, links and captions come from that page; the editorial fields`);
  push(` * (H1, SEO title) still carry placeholders and must be reviewed.`);
  push(` */`);
  push(`export const ${camel(slug)}: CaseRecord = {`);
  push(`  id: "${id}",`);
  push(`  slug: "${slug}",`);
  push(`  direction: "${direction}",`);
  push(`  subcategory: ${JSON.stringify(subcategoryOf(card))},`);
  push(`  uaPath: "/cases/${direction}/${slug}",`);
  push(`  enPath: "/en/cases/${direction}/${slug}",`);
  push();
  push(`  // TODO(editorial): write the H1 (project name + work type where it helps).`);
  push(`  h1: key(${JSON.stringify(card?.titleKey ?? "MISSING_TITLE_KEY")}),`);
  if (leadKey) push(`  lead: key(${JSON.stringify(leadKey)}),`);
  else attention.push("lead paragraph not detected — set `lead` or `subtitle` manually");
  push(`  seo: {`);
  push(`    // TODO(editorial): write the EN SEO title (empty EN arm must be filled).`);
  push(`    title: text(${JSON.stringify(seoTitle ?? "")}, ""),`);
  if (seoDescription?.key) push(`    description: key(${JSON.stringify(seoDescription.key)}),`);
  else if (seoDescription?.literal) push(`    description: text(${JSON.stringify(seoDescription.literal)}, ""),`);
  else attention.push("SEO description missing");
  if (!seoDescription?.key) attention.push(`literal SEO title/description need an EN translation: "${seoTitle}"`);
  push(`    ogImage: ${JSON.stringify(layoutOg ?? heroSrc ?? "")},`);
  push(`  },`);
  if (card?.categoryKey) push(`  badge: key(${JSON.stringify(card.categoryKey)}),`);
  if (glow && glowStrong) push(`  glow: { base: ${JSON.stringify(glow)}, strong: ${JSON.stringify(glowStrong)} },`);
  push();
  push(`  hero: {`);
  if (heroBlock?.kind === "video") {
    push(`    kind: "video",`);
    push(`    src: ${JSON.stringify(heroBlock.src)},`);
    if (heroBlock.poster) push(`    poster: ${JSON.stringify(heroBlock.poster)},`);
    if (heroBlock.fullSrc) push(`    fullSrc: ${JSON.stringify(heroBlock.fullSrc)},`);
    if (heroBlock.w) push(`    w: ${heroBlock.w},`);
    if (heroBlock.h) push(`    h: ${heroBlock.h},`);
    push(`    alt: ${card?.titleKey ? `key(${JSON.stringify(card.titleKey)})` : `text("", "")`},`);
    if (heroBlock.duration) {
      // The badge is literal copy from the original page (often Ukrainian
      // only) — EN wording is an editorial question, not a machine answer.
      attention.push(`literal hero duration needs an EN translation: "${heroBlock.duration}"`);
      push(`    duration: text(${JSON.stringify(heroBlock.duration)}, ""),`);
    }
    if (heroBlock.format) push(`    format: ${JSON.stringify(heroBlock.format)},`);
    if (heroBlock.opensPlayer === false) {
      push(`    // NOTE: no click-to-open player detected on the original hero — verify by hand`);
    }
  } else if (heroBlock?.kind === "videoGrid") {
    push(`    kind: "videoGrid",`);
    push(`    ratio: ${JSON.stringify(heroBlock.ratio ?? "9/16")},`);
    push(`    items: [`);
    for (const item of heroBlock.items) {
      const parts = [`src: ${JSON.stringify(item.src)}`];
      if (item.poster) parts.push(`poster: ${JSON.stringify(item.poster)}`);
      if (item.format) parts.push(`format: ${JSON.stringify(item.format)}`);
      if (item.duration || item.durationLiteral) {
        const dur = item.duration ?? item.durationLiteral;
        attention.push(`literal hero videoGrid duration needs an EN translation: "${dur}"`);
        parts.push(`duration: text(${JSON.stringify(dur)}, "")`);
      }
      if (item.labelLiteral) {
        // Brand/model names are often identical in both languages, but the
        // editor confirms — empty EN forces that check.
        attention.push(`literal hero videoGrid label needs an EN translation: "${item.labelLiteral}"`);
        parts.push(`label: text(${JSON.stringify(item.labelLiteral)}, "")`);
      } else if (item.labelKey) {
        parts.push(`label: key(${JSON.stringify(item.labelKey)})`);
      }
      push(`      { ${parts.join(", ")} },`);
    }
    push(`    ],`);
  } else if (heroBlock?.kind === "imageGrid") {
    push(`    kind: "imageGrid",`);
    push(`    items: [`);
    for (const item of heroBlock.items) {
      // Items are plain strings when they came from a media array.
      const src = typeof item === "string" ? item : item.src;
      const w = typeof item === "string" ? null : item.w;
      const h = typeof item === "string" ? null : item.h;
      const altKey = typeof item === "string" ? null : item.altKey;
      const parts = [`src: ${JSON.stringify(src)}`];
      if (w) parts.push(`w: ${w}`);
      if (h) parts.push(`h: ${h}`);
      if (altKey) parts.push(`alt: key(${JSON.stringify(altKey)})`);
      else if (card?.titleKey) parts.push(`alt: key(${JSON.stringify(card.titleKey)})`);
      push(`      { ${parts.join(", ")} },`);
    }
    push(`    ],`);
  } else {
    push(`    kind: "image",`);
    push(`    src: ${JSON.stringify(heroSrc ?? "")},`);
    push(`    w: 1200,`);
    push(`    h: 800,`);
    push(`    alt: ${card?.titleKey ? `key(${JSON.stringify(card.titleKey)})` : `text("", "")`},`);
    push(`    priority: true,`);
  }
  push(`  },`);
  push();
  push(`  sections: [`);

  /* Sections are emitted in the order the original page renders them. */
  const descriptors = [];
  const addSection = (pos, lines) => descriptors.push({ pos, lines });
  const posOf = (needle, fallback) => {
    const at = page.indexOf(needle);
    return at < 0 ? fallback : at;
  };

  if (blockers.length === 0 && taskKey && solutionKey) {
    const lines = [`    {`, `      kind: "brief",`];
    if (taskTitleKey) lines.push(`      taskTitle: key(${JSON.stringify(taskTitleKey)}),`);
    if (solutionTitleKey) lines.push(`      solutionTitle: key(${JSON.stringify(solutionTitleKey)}),`);
    lines.push(`      task: key(${JSON.stringify(taskKey)}),`);
    lines.push(`      solution: key(${JSON.stringify(solutionKey)}),`);
    lines.push(`    },`);
    addSection(posOf('.challenge")', 0), lines);
  } else if (!blockers.length) {
    attention.push("brief not detected (challenge/solution keys)");
  }

  if (featureItems.length) {
    const lines = [
      `    {`,
      `      kind: "featureList",`,
      `      decorated: true,`,
      `      title: key(${JSON.stringify("itCases.technicals")}),`,
      `      items: [`,
    ];
    for (const item of featureItems) {
      lines.push(`        {`);
      lines.push(`          title: key(${JSON.stringify(item.titleKey)}),`);
      if (item.descKey) lines.push(`          desc: key(${JSON.stringify(item.descKey)}),`);
      if (item.slider) {
        lines.push(`          slider: { before: ${JSON.stringify(item.slider.before)}, after: ${JSON.stringify(item.slider.after)} },`);
      } else if (item.images?.length) {
        lines.push(`          images: [`);
        for (const src of item.images) lines.push(`            { src: ${JSON.stringify(src)} },`);
        lines.push(`          ],`);
      }
      if (item.link) {
        lines.push(
          `          link: { href: ${JSON.stringify(item.link.href)}, label: ${item.link.labelKey ? `key(${JSON.stringify(item.link.labelKey)})` : `text("", "") /* TODO(editorial): label */`} },`,
        );
        if (!item.link.labelKey) attention.push(`link without label key: ${item.link.href}`);
      }
      lines.push(`        },`);
    }
    lines.push(`      ],`, `    },`);
    addSection(componentsArray ? Math.max(renderPos(page, componentsArray.name), 1) : 1, lines);
  } else if (/\.component\d+(?:Title|Desc)["']/.test(page)) {
    attention.push("component keys present but no `components` array — verify the page");
  }

  // A literal dictionary-free text: emit `text(ua, "")` so the empty EN arm
  // FAILS the media check until an editor supplies the translation. This is
  // deliberate — a silent `text(ua, ua)` would put Ukrainian on the EN page.
  const emitText = (keyName, literal, label) => {
    if (keyName) return `key(${JSON.stringify(keyName)})`;
    if (literal != null && literal !== "") {
      attention.push(`literal ${label} needs an EN translation: "${literal}"`);
      return `text(${JSON.stringify(literal)}, "")`;
    }
    return null;
  };

  for (const g of gallerySections) {
    const lines = [`    {`, `      kind: "gallery",`];
    const title = emitText(g.titleKey, g.titleLiteral, "gallery heading");
    if (title) lines.push(`      title: ${title},`);
    if (g.introKey) lines.push(`      intro: key(${JSON.stringify(g.introKey)}),`);
    lines.push(`      columns: ${g.columns},`);
    lines.push(`      items: [`);
    for (const item of g.items) {
      const parts = [`src: ${JSON.stringify(item.src)}`];
      if (item.w) parts.push(`w: ${item.w}`);
      if (item.h) parts.push(`h: ${item.h}`);
      const alt = emitText(item.altKey, item.altLiteral, "gallery alt");
      if (alt) parts.push(`alt: ${alt}`);
      const title2 = emitText(item.titleKey, item.titleLiteral, "gallery item title");
      if (title2) parts.push(`title: ${title2}`);
      const caption = emitText(item.captionKey, item.captionLiteral, "gallery item caption");
      if (caption) parts.push(`caption: ${caption}`);
      if (item.wide) parts.push(`wide: true`);
      lines.push(`        { ${parts.join(", ")} },`);
    }
    lines.push(`      ],`, `    },`);
    addSection(g.pos, lines);
  }

  for (const v of videoGridSections) {
    const lines = [`    {`, `      kind: "videoGrid",`, `      fullscreen: true,`, `      ratio: "9/16",`];
    const title = emitText(v.titleKey, v.titleLiteral, "videoGrid heading");
    if (title) lines.push(`      title: ${title},`);
    if (v.introKey) lines.push(`      intro: key(${JSON.stringify(v.introKey)}),`);
    lines.push(`      items: [`);
    for (const item of v.items) {
      const parts = [`src: ${JSON.stringify(item.src)}`];
      if (item.poster) parts.push(`poster: ${JSON.stringify(item.poster)}`);
      if (item.durationLiteral) {
        // Duration badges are literal copy (often UA-only) — EN is editorial.
        attention.push(`literal video duration needs an EN translation: "${item.durationLiteral}"`);
        parts.push(`duration: text(${JSON.stringify(item.durationLiteral)}, "")`);
      }
      if (item.format) parts.push(`format: ${JSON.stringify(item.format)}`);
      const label = emitText(item.labelKey, item.labelLiteral, "video label");
      if (label) parts.push(`label: ${label}`);
      lines.push(`        { ${parts.join(", ")} },`);
    }
    lines.push(`      ],`, `    },`);
    addSection(v.pos, lines);
  }

  if (galleryGroupsSection) {
    const g = galleryGroupsSection;
    const lines = [`    {`, `      kind: "galleryGroups",`];
    if (g.titleKey) lines.push(`      title: key(${JSON.stringify(g.titleKey)}),`);
    if (g.introKey) lines.push(`      intro: key(${JSON.stringify(g.introKey)}),`);
    lines.push(`      groups: [`);
    for (const group of g.groups) {
      lines.push(`        {`);
      if (group.titleKey) lines.push(`          title: key(${JSON.stringify(group.titleKey)}),`);
      if (group.introKey) lines.push(`          intro: key(${JSON.stringify(group.introKey)}),`);
      lines.push(`          items: [`);
      for (const item of group.items) {
        const parts = [`src: ${JSON.stringify(item.src)}`];
        if (item.w) parts.push(`w: ${item.w}`);
        if (item.h) parts.push(`h: ${item.h}`);
        if (item.titleKey) parts.push(`title: key(${JSON.stringify(item.titleKey)})`);
        if (item.captionKey) parts.push(`caption: key(${JSON.stringify(item.captionKey)})`);
        lines.push(`            { ${parts.join(", ")} },`);
      }
      lines.push(`          ],`, `        },`);
    }
    lines.push(`      ],`, `    },`);
    addSection(g.pos, lines);
  }

  for (const c of compareSections) {
    const lines = [`    {`, `      kind: "compare",`];
    if (c.titleKey) lines.push(`      title: key(${JSON.stringify(c.titleKey)}),`);
    if (c.introKey) lines.push(`      intro: key(${JSON.stringify(c.introKey)}),`);
    lines.push(`      items: [`);
    for (const item of c.items) {
      const parts = [
        `mode: "slider"`,
        `before: ${JSON.stringify(item.before)}`,
        `after: ${JSON.stringify(item.after)}`,
      ];
      if (item.titleKey) parts.push(`title: key(${JSON.stringify(item.titleKey)})`);
      if (item.captionKey) parts.push(`caption: key(${JSON.stringify(item.captionKey)})`);
      lines.push(`        { ${parts.join(", ")} },`);
    }
    lines.push(`      ],`, `    },`);
    addSection(c.pos, lines);
  }

  for (const c of checklistSections) {
    const lines = [`    {`, `      kind: "checklist",`];
    if (c.titleKey) lines.push(`      title: key(${JSON.stringify(c.titleKey)}),`);
    if (c.introKey) lines.push(`      intro: key(${JSON.stringify(c.introKey)}),`);
    if (c.columns) lines.push(`      columns: ${c.columns},`);
    lines.push(`      items: [`);
    for (const k of c.items) lines.push(`        key(${JSON.stringify(k)}),`);
    lines.push(`      ],`, `    },`);
    addSection(c.pos, lines);
  }

  if (clientCard) {
    const lines = [`    {`, `      kind: "prose",`];
    if (clientCard.titleKey) lines.push(`      title: key(${JSON.stringify(clientCard.titleKey)}),`);
    if (clientCard.subtitleKey) lines.push(`      subtitle: key(${JSON.stringify(clientCard.subtitleKey)}),`);
    if (clientCard.textKey) lines.push(`      text: key(${JSON.stringify(clientCard.textKey)}),`);
    if (clientCard.image) {
      const parts = [`src: ${JSON.stringify(clientCard.image.src)}`];
      if (clientCard.image.w) parts.push(`w: ${clientCard.image.w}`);
      if (clientCard.image.h) parts.push(`h: ${clientCard.image.h}`);
      if (clientCard.image.altKey) parts.push(`alt: key(${JSON.stringify(clientCard.image.altKey)})`);
      else if (clientCard.image.altLiteral) {
        attention.push(`literal client-profile alt needs an EN translation: "${clientCard.image.altLiteral}"`);
        parts.push(`alt: text(${JSON.stringify(clientCard.image.altLiteral)}, "")`);
      }
      lines.push(`      image: { ${parts.join(", ")} },`);
    }
    lines.push(`    },`);
    addSection(clientCard.pos, lines);
  }

  if (resultKeys.length) {
    const lines = [`    {`, `      kind: "results",`];
    if (resultsTitleKey) lines.push(`      title: key(${JSON.stringify(resultsTitleKey)}),`);
    lines.push(`      columns: 1,`);
    lines.push(`      items: [`);
    for (const k of resultKeys) lines.push(`        key(${JSON.stringify(k)}),`);
    lines.push(`      ],`, `    },`);
    addSection(resultsArray ? Math.max(renderPos(page, resultsArray.name), 2) : 2, lines);
  } else if (!blockers.length) {
    attention.push("results array not found");
  }

  if (pageLinkLabels.length) {
    const lines = [`    {`, `      kind: "links",`, `      items: [`];
    for (const link of pageLinkLabels) {
      const label = link.labelKey
        ? `key(${JSON.stringify(link.labelKey)})`
        : `text(${JSON.stringify(link.literalLabel ?? "")}, ${JSON.stringify(link.literalLabel ?? "")}) /* TODO(editorial): EN */`;
      const parts = [`href: ${JSON.stringify(link.href)}`, `label: ${label}`];
      if (link.titleKey) parts.push(`title: key(${JSON.stringify(link.titleKey)})`);
      if (link.textKey) parts.push(`text: key(${JSON.stringify(link.textKey)})`);
      if (link.icon) parts.push(`icon: ${JSON.stringify(link.icon)}`);
      lines.push(`        { ${parts.join(", ")} },`);
    }
    lines.push(`      ],`, `    },`);
    addSection(Math.min(...pageLinkLabels.map((l) => l.pos)), lines);
  }

  descriptors.sort((a, b) => a.pos - b.pos);
  for (const descriptor of descriptors) for (const line of descriptor.lines) push(line);

  push(`  ],`);
  push();

  if (review) {
    push(`  review: {`);
    push(`    kind: "${review.kind}",`);
    if (review.titleKey) push(`    title: key(${JSON.stringify(review.titleKey)}),`);
    if (review.kind === "audio") {
      push(`    src: ${JSON.stringify(review.src)},`);
      if (review.authorKey) push(`    author: key(${JSON.stringify(review.authorKey)}),`);
      if (review.caption) push(`    caption: text(${JSON.stringify(review.caption.uk)}, ${JSON.stringify(review.caption.en)}),`);
    } else if (review.kind === "video") {
      push(`    src: ${JSON.stringify(review.src)},`);
    } else if (review.kind === "screenshot") {
      push(`    src: ${JSON.stringify(review.src)},`);
      const altKey = review.altKey ?? review.authorKey;
      if (review.altLiteral) {
        push(`    alt: text(${JSON.stringify(review.altLiteral)}, ${JSON.stringify(review.altLiteral)}), // TODO(editorial): EN translation`);
        attention.push("review screenshot alt is a hardcoded UA string — add the EN translation");
      } else {
        push(`    alt: ${altKey ? `key(${JSON.stringify(altKey)})` : `text("", "")`},`);
      }
      if (review.textKey) push(`    text: key(${JSON.stringify(review.textKey)}),`);
      if (review.authorKey) push(`    author: key(${JSON.stringify(review.authorKey)}),`);
      if (review.captionKey) push(`    caption: key(${JSON.stringify(review.captionKey)}),`);
      if (review.w && review.h) push(`    w: ${review.w},`);
      if (review.w && review.h) push(`    h: ${review.h},`);
    } else {
      if (review.textKey) push(`    text: key(${JSON.stringify(review.textKey)}),`);
      if (review.authorKey) push(`    author: key(${JSON.stringify(review.authorKey)}),`);
    }
    push(`  },`);
  }

  if (teamLabelKey && teamValueKey) {
    push(`  team: {`);
    push(`    label: key(${JSON.stringify(teamLabelKey)}),`);
    push(`    value: key(${JSON.stringify(teamValueKey)}),`);
    push(`  },`);
  } else {
    attention.push(`team not detected (label=${teamLabelKey}, value=${teamValueKey})`);
  }

  if (backHref && backLabelKey) {
    const enHref = backHref.startsWith("/") ? `/en${backHref}` : backHref;
    push(`  backToList: {`);
    push(`    label: key(${JSON.stringify(backLabelKey)}),`);
    push(`    href: { uk: ${JSON.stringify(backHref)}, en: ${JSON.stringify(enHref)} },`);
    push(`  },`);
  }

  push(`};`);
  push();

  return {
    id,
    code: out.join("\n"),
    blockers,
    attention,
    pageLinks,
    seoTitle,
    cardTitle,
    cardTitleEn,
    cardDesc,
    cardDescEn,
    layoutDesc,
    leadKey,
    review,
    pageLinkLabels,
    sectionPlan: [
      ...(taskKey && solutionKey ? [{ kind: "brief" }] : []),
      ...gallerySections.map((g) => ({ kind: "gallery", name: g.name, title: g.titleKey, intro: g.introKey, items: g.items.length })),
      ...(galleryGroupsSection
        ? [{ kind: "galleryGroups", title: galleryGroupsSection.titleKey, intro: galleryGroupsSection.introKey, items: galleryGroupsSection.groups.length }]
        : []),
      ...compareSections.map((c) => ({ kind: "compare", name: c.name, title: c.titleKey, intro: c.introKey, items: c.items.length })),
      ...checklistSections.map((c) => ({ kind: "checklist", name: c.name, title: c.titleKey, intro: c.introKey, items: c.items.length })),
      ...(resultKeys.length ? [{ kind: "results", title: resultsTitleKey, items: resultKeys.length }] : []),
    ],
    featureCount: featureItems.length,
    resultCount: resultKeys.length,
    heroSrc,
  };
}

/* ─────────────────────── writing the files ─────────────────────── */

const thinPage = (direction, slug, locale) => {
  const id = `${direction}/${slug}`;
  const comp = camel(slug) + "CasePage";
  return `import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Reworked case page (Package 4): body, metadata and related work all come
// from one record in data/case-records/.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("${id}", "${locale}");
}

export default function ${locale === "en" ? `En${comp}` : comp}() {
  return <CasePage id="${id}" locale="${locale}" />;
}
`;
};

function appendToRegistry(direction, slug, exportName) {
  const indexPath = path.join(ROOT, "data/case-records/index.ts");
  let src = read(indexPath);
  const rel = `./${direction}/${slug}`;
  if (src.includes(`from "${rel}"`)) return false;
  const importLine = `import { ${exportName} } from "${rel}";`;
  const lastImport = src.lastIndexOf('\nimport ');
  const lineEnd = src.indexOf("\n", lastImport + 1);
  src = src.slice(0, lineEnd + 1) + importLine + "\n" + src.slice(lineEnd + 1);
  src = src.replace(/export const caseRecords: CaseRecord\[\] = \[/, `export const caseRecords: CaseRecord[] = [\n  ${exportName},`);
  if (!DRY) fs.writeFileSync(indexPath, src);
  return true;
}

function writePages(direction, slug) {
  const uaDir = path.join(ROOT, "app/(uk)/cases", direction, slug);
  const enDir = path.join(ROOT, "app/en/cases", direction, slug);
  if (DRY) return;
  fs.writeFileSync(path.join(uaDir, "page.tsx"), thinPage(direction, slug, "uk"));
  fs.mkdirSync(enDir, { recursive: true });
  fs.writeFileSync(path.join(enDir, "page.tsx"), thinPage(direction, slug, "en"));
  const layout = path.join(uaDir, "layout.tsx");
  if (fs.existsSync(layout)) fs.unlinkSync(layout);
}

/* ─────────────────────── run ─────────────────────── */

function collectTargets() {
  if (ids.length) return ids;
  if (dirArg) {
    const base = path.join(ROOT, "app/(uk)/cases", dirArg);
    return fs
      .readdirSync(base)
      .filter((slug) => !registry.caseRecords.some((r) => r.id === `${dirArg}/${slug}`))
      .sort()
      .slice(0, limit || undefined)
      .map((slug) => `${dirArg}/${slug}`);
  }
  return [];
}

/* ── `--survey`: read-only structure report, no files are written ── */
if (SURVEY) {
  const rows = [];
  for (const target of collectTargets()) {
    const [direction, slug] = target.split("/");
    const profile = surveyPage(direction, slug);
    rows.push(profile);
    if (profile.error) { console.log(`=== ${profile.id} ===\n  ERROR: ${profile.error}`); continue; }
    console.log(`=== ${profile.id} ===`);
    console.log(`  arrays: ${profile.arrays.map((a) => `${a.name}→${a.kind}${a.supported ? "" : " ✗"}`).join(", ") || "—"}`);
    console.log(`  inline JSX media arrays: ${profile.inline.length}`);
    console.log(`  hero: ${profile.hero} | review: ${profile.review}`);
    for (const b of profile.blockers) console.log(`  UNSUPPORTED: ${b}`);
    if (profile.supported) console.log("  → mappable by the current schema");
  }
  const ok = rows.filter((r) => r.supported).length;
  console.log(`\nsurvey: ${rows.length} page(s), ${ok} mappable, ${rows.length - ok} need schema/mapper work`);
  process.exit(0);
}

const report = [];
for (const target of collectTargets()) {
  const [direction, slug] = target.split("/");
  if (registry.caseRecords.some((r) => r.id === target)) {
    report.push({ id: target, skipped: "already in the registry" });
    continue;
  }
  const result = migrate(direction, slug);
  if (result.error) { report.push({ id: target, error: result.error }); continue; }
  if (result.blockers && result.blockers.length && !FORCE) {
    report.push({ id: target, blockers: result.blockers });
    continue;
  }

  if (!DRY) {
    fs.mkdirSync(path.join(ROOT, "data/case-records", direction), { recursive: true });
    fs.writeFileSync(path.join(ROOT, "data/case-records", direction, `${slug}.ts`), result.code);
    appendToRegistry(direction, slug, camel(slug));
    writePages(direction, slug);
  }
  report.push(result);
}

for (const row of report) {
  console.log(`\n=== ${row.id} ===`);
  if (row.skipped) { console.log(`  skipped: ${row.skipped}`); continue; }
  if (row.error) { console.log(`  ERROR: ${row.error}`); continue; }
  if (row.blockers && row.blockers.length) {
    console.log("  NOT WRITTEN — the shared schema cannot express this page yet:");
    for (const b of row.blockers) console.log(`    - ${b}`);
    continue;
  }
  console.log(`  h1/SEO placeholders ← "${row.cardTitle}" / "${row.seoTitle}"`);
  console.log(`  lead: ${row.leadKey ?? "-"}`);
  console.log(
    `  blocks: featureList=${row.featureCount} results=${row.resultCount} review=${row.review?.kind ?? "none"}` +
      (row.review ? ` reviewTitle=${row.review.titleKey ?? "(none)"}` : ""),
  );
  if (row.sectionPlan?.length) {
    console.log(
      `  sections: ${row.sectionPlan
        .map(
          (sec) =>
            `${sec.kind}${sec.items != null ? `(${sec.items})` : ""}` +
            `${sec.title ? `[${sec.title}]` : ""}${sec.intro ? `{${sec.intro}}` : ""}`,
        )
        .join(" → ")}`,
    );
  }
  console.log(`  media: hero=${row.heroSrc?.split("/").pop()} links=${row.pageLinkLabels?.map((l) => `${l.href} (${l.labelKey})`).join(", ") || "—"}`);
  for (const note of row.attention) console.log(`  ATTENTION: ${note}`);
}
console.log(`\n${DRY ? "[dry-run] " : ""}processed ${report.length} case(s)`);
