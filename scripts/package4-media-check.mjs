// Package 4 material check: did a reworked case keep everything the original
// page rendered — and in the same order, with the same captions and links?
//
//   node scripts/package4-media-check.mjs [--base http://localhost:3011] [--out …]
//
// "Before" is the pre-Package-4 page taken from the git index (the staged
// rename still holds the original source; the worktree copy has been replaced
// by the thin record-driven page). "After" is the case record.
//
// What is verified (a set of unique files alone is NOT enough):
//   1. coverage      — every /media/… value inside a record is emitted by
//                      collectRecordMedia (incl. a review video poster);
//   2. set           — the same files, nothing added, nothing dropped;
//   3. order         — record section order = source group order (runs of
//                      consecutive source arrays / ordered subsequence), and
//                      the record order survives into the rendered HTML;
//   4. multiplicity  — every file is rendered as many times as the record says
//                      (a gallery frame reused by the hero counts twice);
//   5. reuse         — files shared between cases still resolve to the same
//                      set of cases;
//   6. captions      — every caption key of the original page is still used
//                      (or listed as intentionally moved), and every text in
//                      the record resolves to a non-empty string in both
//                      languages;
//   7. links         — external links keep their URL *and* their label;
//   8. OG cover      — kept and measurable.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
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
const OUT = arg("--out", path.join(process.cwd(), "docs", "package-4", "media-before-after.md"));
const BASE = arg("--base", "http://localhost:3011").replace(/\/$/, "");

const registry = await import(pathToFileURL(path.join(process.cwd(), "data/case-records/index.ts")).href);
const { translations } = await import(pathToFileURL(path.join(process.cwd(), "lib/i18n.ts")).href);
const { isKeyRef } = await import(pathToFileURL(path.join(process.cwd(), "data/case-records/types.ts")).href);
const { itCases } = await import(pathToFileURL(path.join(process.cwd(), "data/itCases.ts")).href);
const { designCases } = await import(pathToFileURL(path.join(process.cwd(), "data/designCases.ts")).href);
const { videoCases } = await import(pathToFileURL(path.join(process.cwd(), "data/videoCases.ts")).href);
const records = registry.caseRecords;

/** The catalogue card's title key for a record — reused by the card even when
 *  the detail page's H1 was rewritten to a literal. */
const cardTitleKey = (record) => {
  const cards = { it: itCases, design: designCases, video: videoCases }[record.direction];
  return cards?.find((c) => c.slug === record.slug)?.titleKey ?? null;
};

const norm = (raw) => String(raw ?? "").split(/[?#]/)[0];
const failures = [];
const fail = (scope, message) => failures.push(`${scope}: ${message}`);

/* ─────────────────────────── reading the "before" side ─────────────────────────── */

/* The pre-Package-4 source of the pages. It must come from an IMMUTABLE commit:
 * `HEAD` and `:path` (the git index) both move as the rework lands, so a re-run
 * would read the reworked pages and silently "pass" by comparing a page with
 * itself. Package 2/4 moved `app/cases/{d}/{slug}/` → `app/(uk)/cases/{d}/{slug}/`,
 * so the baseline paths are the OLD ones, read from BASELINE_COMMIT.
 * Nothing here writes to the index or touches the worktree. */
const BASELINE_COMMIT = "33ef0b5";

/** Registry record path (new tree) → baseline path (old tree). */
const baselinePath = (path_) =>
  path_.replace(/^app\/\(uk\)\/cases\//, "app/cases/");

/** Read the pre-Package-4 source of a path from the immutable baseline commit.
 *  Returns `null` when the file never existed there — the caller must report a
 *  MISSING BASELINE instead of comparing against empty content. */
function indexSource(path_) {
  const spec = `${BASELINE_COMMIT}:${baselinePath(path_)}`;
  try {
    return execFileSync("git", ["show", spec], { encoding: "utf8", maxBuffer: 1 << 24 });
  } catch {
    return null;
  }
}

/** Top-level `const NAME = [ … ]` / `new Set([ … ])` with their media in order. */
function sourceArrayGroups(src) {
  const groups = [];
  const masked = [];
  // A `new Set([...])` of media paths (e.g. `mobileSplitItems`) is not a
  // rendered block, but it must still be listed so the report can say
  // whether the page CONSUMES it (`.has()`) or it really is dead data.
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
    const body = src.slice(open, end + 1);
    const media = [...body.matchAll(/["'`](\/media\/[^"'`\s?#]+)(?:[?#][^"'`\s]*)?["'`]/g)].map((x) => norm(x[1]));
    if (media.length) groups.push({ name: m[1], media });
    masked.push([m.index, end + 1]);
  }
  return { groups, masked };
}

/** Media occurrences outside the const arrays (inline JSX), in source order. */
function sourceInlineMedia(src, masked) {
  let rest = src;
  for (let i = masked.length - 1; i >= 0; i--) {
    rest = rest.slice(0, masked[i][0]) + " ".repeat(masked[i][1] - masked[i][0]) + rest.slice(masked[i][1]);
  }
  return [...rest.matchAll(/["'`](\/media\/[^"'`\s?#]+)(?:[?#][^"'`\s]*)?["'`]/g)].map((x) => norm(x[1]));
}

/** All i18n keys referenced by a source file. */
function sourceKeys(src) {
  return [...new Set([...src.matchAll(/["']((?:itCases|designCases|videoCases)\.[A-Za-z0-9_.]+)["']/g)].map((m) => m[1]))];
}

/** Top-level `const NAME = "value";` — pages keep some URLs behind them. */
function sourceConstants(src) {
  const map = {};
  for (const m of src.matchAll(/^const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"([^"]*)"/gm)) map[m[1]] = m[2];
  return map;
}

/**
 * Replace `src={CONST}` (and `poster={CONST}`) with the literal path when the
 * constant holds a `/media/…` URL.
 *
 * Pages such as moto-school reference their artwork through a constant from
 * the hero, the scene cards and the mobile detail crops. Without this pass
 * those occurrences are invisible to the source extractor, so the order check
 * cannot see that the record renders the same file several times.
 */
function resolveConstRefs(src) {
  const constants = sourceConstants(src);
  return src.replace(/\b(src|poster)=\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (match, attr, name) => {
    const value = constants[name];
    return value && value.startsWith("/media/") ? `${attr}="${value}"` : match;
  });
}

/** Caption-ish keys (labels that are rendered next to media). */
function sourceCaptionKeys(src) {
  const out = new Set();
  for (const re of [
    /\btitleKey:\s*"([^"]+)"/g,
    /\bcaptionKey:\s*"([^"]+)"/g,
    /\bdescKey:\s*"([^"]+)"/g,
    /\blinkLabelKey:\s*"([^"]+)"/g,
    /\balt=\{t\("([^"]+)"\)\}/g,
    /\b(?:title|caption|alt)=\{t\("([^"]+)"\)\}/g,
  ]) {
    for (const m of src.matchAll(re)) out.add(m[1]);
  }
  return [...out];
}

/** `link: "url"` + `linkLabelKey` pairs from flat object literals. */
function sourceLinks(src) {
  const pairs = [];
  for (const m of src.matchAll(/\{([^{}]*?\blink:\s*"([^"]+)"[^{}]*?)\}/g)) {
    const label = m[1].match(/\blinkLabelKey:\s*"([^"]+)"/)?.[1] ?? null;
    pairs.push({ url: m[2], labelKey: label });
  }
  // Plain anchors (`<a href="…">`) — URL only, labels come from the CTA key.
  for (const m of src.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    if (!pairs.some((p) => p.url === m[1])) pairs.push({ url: m[1], labelKey: null });
  }
  return pairs;
}

function extract(src) {
  if (!src) return null;
  // `src={CONST}` occurrences become literal paths before anything is split.
  const resolved = resolveConstRefs(src);
  const { groups, masked } = sourceArrayGroups(resolved);
  const inline = sourceInlineMedia(resolved, masked);
  return {
    groups,
    inline,
    media: [...new Set([...groups.flatMap((g) => g.media), ...inline])],
    keys: sourceKeys(src),
    captionKeys: sourceCaptionKeys(src),
    links: sourceLinks(src),
    ogImage: src.match(/images:\s*\[\s*"([^"]+)"/)?.[1] ?? null,
  };
}

/* ─────────────────────────── reading the "after" side ─────────────────────────── */

/** Media references in render order, WITHOUT de-duplication. */
function recordRenderList(record) {
  const out = [];
  const push = (src) => {
    const file = norm(src);
    if (file.startsWith("/media/")) out.push(file);
  };
  const hero = record.hero;
  if (hero.kind === "image") push(hero.src);
  if (hero.kind === "imageGrid") hero.items.forEach((i) => push(i.src));
  if (hero.kind === "video") { push(hero.src); push(hero.poster); }
  if (hero.kind === "videoGrid") hero.items.forEach((i) => { push(i.src); push(i.poster); });
  // A `splitMobile` gallery item renders the same file three times in the
  // HTML: the whole image (desktop) plus its two mobile halves.
  const pushGalleryItem = (item) => {
    push(item.src);
    if (item.presentation?.splitMobile) { push(item.src); push(item.src); }
  };
  for (const section of record.sections) {
    if (section.kind === "featureList") section.items.forEach((i) => i.images?.forEach((img) => push(img.src)));
    if (section.kind === "compare") section.items.forEach((i) => { push(i.before); push(i.after); });
    if (section.kind === "gallery") section.items.forEach(pushGalleryItem);
    if (section.kind === "galleryGroups") section.groups.forEach((g) => g.items.forEach(pushGalleryItem));
    // A scene renders its image once, plus once more per mobile detail crop
    // (the crops are the same file, framed).
    if (section.kind === "scenes") {
      section.items.forEach((item) => {
        push(item.image.src);
        (item.details ?? []).forEach(() => push(item.image.src));
      });
    }
    if (section.kind === "videoGrid") section.items.forEach((i) => { push(i.src); push(i.poster); });
    if (section.kind === "prose") push(section.image?.src);
    if (section.kind === "links") section.items.forEach((i) => push(i.image?.src));
  }
  if (record.review) {
    const collect = (review) => {
      if (review.kind === "group") {
        review.items.forEach(collect);
        return;
      }
      push(review.src);
      if (review.kind === "video") push(review.poster);
      if (review.kind === "screenshot") (review.more ?? []).forEach(push);
    };
    collect(record.review);
  }
  return out;
}

/** Ordered media per rendered block (hero / sections / review). */
function recordBlocks(record) {
  const blocks = [];
  const hero = record.hero;
  if (hero.kind === "image") blocks.push({ name: "hero", media: [norm(hero.src)] });
  if (hero.kind === "imageGrid") blocks.push({ name: "hero", media: hero.items.map((i) => norm(i.src)) });
  if (hero.kind === "video") {
    blocks.push({ name: "hero", media: [norm(hero.src), norm(hero.poster)].filter((x) => x.startsWith("/media/")) });
  }
  if (hero.kind === "videoGrid") {
    // A video-grid hero renders each tile as a button; the source lists the
    // `src` and `poster` paths as separate inline occurrences, so the exact
    // source-run match is not meaningful — the per-block DOM order is.
    blocks.push({
      name: "hero",
      media: hero.items.flatMap((i) => [norm(i.src), norm(i.poster)].filter((x) => x.startsWith("/media/"))),
      domOrdered: true,
    });
  }
  record.sections.forEach((section, index) => {
    const media = [];
    if (section.kind === "featureList") {
      section.items.forEach((item) => {
        item.images?.forEach((img) => media.push(norm(img.src)));
        if (item.slider) {
          media.push(norm(item.slider.before));
          media.push(norm(item.slider.after));
        }
      });
    }
    if (section.kind === "compare") section.items.forEach((i) => { media.push(norm(i.before)); media.push(norm(i.after)); });
    if (section.kind === "gallery") section.items.forEach((i) => media.push(norm(i.src)));
    // A `scenes` block is ordered by its rendered DOM, not by source-code
    // position: the original page defines its stage cards in one order and
    // places them in the JSX grid in another, and a mobile detail crop is a
    // single source occurrence that renders several times. `domOrdered`
    // exempts the block from the exact source-run match — the per-block DOM
    // check is the authority for this kind, and the file set is still held to
    // the same equality as every other case.
    if (section.kind === "scenes") {
      section.items.forEach((item) => {
        media.push(norm(item.image.src));
        (item.details ?? []).forEach(() => media.push(norm(item.image.src)));
      });
      blocks.push({ name: `${section.kind}@${index}`, media, domOrdered: true });
      return;
    }
    if (section.kind === "videoGrid") section.items.forEach((i) => { media.push(norm(i.src)); media.push(norm(i.poster)); });
    if (section.kind === "prose" && section.image) media.push(norm(section.image.src));
    if (section.kind === "links") section.items.forEach((i) => { if (i.image) media.push(norm(i.image.src)); });
    if (media.length) {
      // Video grids: DOM order is the authority (src/poster interleave in the
      // source as separate inline occurrences).
      const domOrdered = section.kind === "videoGrid" || section.kind === "scenes";
      blocks.push({ name: `${section.kind}@${index}`, media, ...(domOrdered ? { domOrdered: true } : {}) });
    }
  });
  if (record.review) {
    const pushReviewBlocks = (review) => {
      if (review.kind === "group") {
        review.items.forEach(pushReviewBlocks);
        return;
      }
      if ("src" in review && norm(review.src).startsWith("/media/")) {
        const media = [norm(review.src)];
        if (review.kind === "video" && review.poster) media.push(review.poster);
        if (review.kind === "screenshot") (review.more ?? []).forEach((s) => media.push(norm(s)));
        blocks.push({ name: "review", media });
      }
    };
    pushReviewBlocks(record.review);
  }
  return blocks;
}

/** Every /media/… string anywhere in the record (fields the helper must know). */
function recordAllMedia(node, out = []) {
  if (typeof node === "string") {
    if (node.startsWith("/media/")) out.push(norm(node));
    return out;
  }
  if (Array.isArray(node)) {
    for (const child of node) recordAllMedia(child, out);
    return out;
  }
  if (node && typeof node === "object") {
    for (const value of Object.values(node)) recordAllMedia(value, out);
  }
  return out;
}

/** Dictionary keys and literal uk/en pairs used anywhere in a record. */
function recordTexts(node, out = { keys: [], literals: [] }, at = []) {
  if (Array.isArray(node)) {
    node.forEach((child, i) => recordTexts(child, out, [...at, i]));
    return out;
  }
  if (node && typeof node === "object") {
    const keys = Object.keys(node);
    if (keys.length === 1 && keys[0] === "key" && typeof node.key === "string") {
      out.keys.push({ key: node.key, at: at.join(".") });
      return out;
    }
    if (keys.length === 2 && typeof node.uk === "string" && typeof node.en === "string") {
      out.literals.push({ uk: node.uk, en: node.en, at: at.join(".") });
      return out;
    }
    for (const key of keys) recordTexts(node[key], out, [...at, key]);
  }
  return out;
}

function recordLinks(record) {
  const out = [];
  for (const section of record.sections) {
    if (section.kind === "featureList") {
      section.items.forEach((item) => {
        if (item.link) out.push({ url: item.link.href, labelKey: isKeyRef(item.link.label) ? item.link.label.key : null, label: item.link.label });
      });
    }
    if (section.kind === "links") {
      section.items.forEach((item) =>
        out.push({
          // The source page is Ukrainian: a localized pair compares by its uk side.
          url: typeof item.href === "string" ? item.href : item.href.uk,
          labelKey: isKeyRef(item.label) ? item.label.key : null,
          label: item.label,
        }),
      );
    }
  }
  return out;
}

/* ─────────────────────────── rendered HTML ─────────────────────────── */

/** Multiset of /media/… files referenced by img/video/source elements. */
function htmlRenderCounts(html) {
  const counts = new Map();
  const elements = html.match(/<(?:img|video|audio|source)\b[^>]*>/g) ?? [];
  for (const tag of elements) {
    const raws = [];
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    const poster = tag.match(/\bposter="([^"]+)"/)?.[1];
    const srcset = tag.match(/\bsrcset="([^"]+)"/)?.[1];
    if (src) raws.push(src);
    if (poster) raws.push(poster);
    if (srcset) {
      for (const part of srcset.replace(/&amp;/g, "&").split(",")) raws.push(part.trim().split(/\s+/)[0]);
    }
    const seen = new Set();
    for (const raw of raws) {
      let file = raw;
      const query = raw.match(/[?&]url=([^&"]+)/);
      if (query) {
        try { file = decodeURIComponent(query[1]); } catch { continue; }
      }
      file = norm(file);
      if (!file.startsWith("/media/") || seen.has(file)) continue;
      seen.add(file);
      counts.set(file, (counts.get(file) ?? 0) + 1);
    }
  }
  return counts;
}

/**
 * Per rendered block: the record's items as groups of files. Files inside one
 * group may appear in any relative order in the DOM (a slider layers "after"
 * under "before"), but the groups themselves must follow the record order.
 */
function recordBlockItems(record) {
  const out = [];
  const hero = record.hero;
  if (hero.kind === "image") out.push({ block: "hero", items: [[norm(hero.src)]] });
  if (hero.kind === "imageGrid") out.push({ block: "hero", items: hero.items.map((i) => [norm(i.src)]) });
  if (hero.kind === "video") {
    out.push({ block: "hero", items: [[norm(hero.src), norm(hero.poster)].filter((x) => x.startsWith("/media/"))] });
  }
  if (hero.kind === "videoGrid") {
    out.push({
      block: "hero",
      items: hero.items.map((i) => [norm(i.src), norm(i.poster)].filter((x) => x.startsWith("/media/"))),
    });
  }
  const push = (name, items) => {
    if (items.length) out.push({ block: name, items });
  };
  push(
    "featureList",
    (record.sections.find((section) => section.kind === "featureList")?.items ?? [])
      .map((item) => [
        ...(item.images ?? []).map((img) => norm(img.src)),
        ...(item.slider ? [norm(item.slider.before), norm(item.slider.after)] : []),
      ])
      .filter((group) => group.length > 0),
  );
  push(
    "compare",
    (record.sections.find((section) => section.kind === "compare")?.items ?? []).map((item) => [
      norm(item.before),
      norm(item.after),
    ]),
  );
  push(
    "gallery",
    (record.sections.find((section) => section.kind === "gallery")?.items ?? []).map((item) => [norm(item.src)]),
  );
  // Scenes: one group per card — the scene image plus its detail crops (the
  // same file). Ownership of the file stays with the card, so a file reused
  // by two cards cannot confuse the ordering verdict.
  for (const section of record.sections) {
    if (section.kind !== "scenes") continue;
    push(
      "scenes",
      section.items.map((item) => [
        norm(item.image.src),
        ...(item.details ?? []).map(() => norm(item.image.src)),
      ]),
    );
  }
  push(
    "videoGrid",
    (record.sections.find((section) => section.kind === "videoGrid")?.items ?? []).map((item) => [
      norm(item.src),
      norm(item.poster),
    ].filter((x) => x.startsWith("/media/"))),
  );
  for (const section of record.sections) {
    if (section.kind === "prose" && section.image) push("prose", [[norm(section.image.src)]]);
    if (section.kind === "links") {
      push("links", section.items.filter((i) => i.image).map((i) => [norm(i.image.src)]));
    }
  }
  push(
    "review",
    (() => {
      if (!record.review) return [];
      const groups = [];
      const walk = (review) => {
        if (review.kind === "group") {
          review.items.forEach(walk);
          return;
        }
        if ("src" in review && norm(review.src).startsWith("/media/")) {
          groups.push([
            norm(review.src),
            ...((review.kind === "screenshot" ? review.more ?? [] : []).map((s) => [norm(s)][0])),
          ]);
        }
      };
      walk(record.review);
      return groups;
    })(),
  );
  return out;
}

/** Inner HTML of the first element carrying data-case-block="<name>" (tag-depth aware). */
function elementInner(html, block) {
  // `\\b` must be escaped for the RegExp constructor: inside a template
  // literal `\b` is a backspace, not a word boundary.
  const open = new RegExp(`<([a-z0-9]+)([^>]*\\bdata-case-block="${block}"[^>]*)>`, "i").exec(html);
  if (!open) return null;
  const tag = open[1].toLowerCase();
  const start = open.index + open[0].length;
  let depth = 1;
  let i = start;
  const openRe = new RegExp(`<${tag}\\b[^>]*>`, "gi");
  const closeRe = new RegExp(`</${tag}>`, "gi");
  while (i < html.length && depth > 0) {
    openRe.lastIndex = i;
    closeRe.lastIndex = i;
    const nextOpen = openRe.exec(html);
    const nextClose = closeRe.exec(html);
    if (!nextClose) return null;
    if (nextOpen && nextOpen.index < nextClose.index) {
      depth += 1;
      i = nextOpen.index + nextOpen[0].length;
    } else {
      depth -= 1;
      if (depth === 0) return html.slice(start, nextClose.index);
      i = nextClose.index + nextClose[0].length;
    }
  }
  return null;
}

/* ─────────────────────────── order matching ─────────────────────────── */

const sameSeq = (a, b) => a.length === b.length && a.every((value, i) => value === b[i]);
const isSubsequence = (needle, haystack) => {
  let i = 0;
  for (const value of haystack) {
    if (i < needle.length && needle[i] === value) i += 1;
  }
  return i === needle.length;
};

/**
 * Match every rendered block against the source constructs it came from:
 *   exact      — the block equals a consecutive run of source arrays/inlines
 *                (their internal order must match exactly);
 *   subsequence— the block is an ordered subsequence of one source construct
 *                (a gallery frame the hero re-uses);
 *   unmatched  — nothing fits → order cannot be proven.
 * Every source construct must be consumed by an exact match, otherwise its
 * sequence disappeared from the page.
 */
function matchOrder(afterBlocks, units) {
  const consumed = units.map(() => false);
  const report = [];
  const pending = [];

  for (const block of afterBlocks) {
    // A block flagged `domOrdered` is verified by the per-block DOM check
    // (recordBlockItems + elementInner), which reads the page the visitor
    // actually gets. The source-run match does not apply to it.
    if (block.domOrdered) {
      report.push({ block: block.name, kind: "dom-ordered", units: [] });
      continue;
    }
    let matched = false;
    for (let start = 0; start < units.length && !matched; start++) {
      if (consumed[start]) continue;
      let acc = [];
      for (let end = start; end < units.length && !matched; end++) {
        if (consumed[end]) break;
        acc = acc.concat(units[end].media);
        if (acc.length > block.media.length) break;
        if (sameSeq(acc, block.media)) {
          for (let k = start; k <= end; k++) consumed[k] = true;
          report.push({ block: block.name, kind: "exact", units: units.slice(start, end + 1).map((u) => u.name) });
          matched = true;
        }
      }
    }
    if (!matched) pending.push(block);
  }

  for (const block of pending) {
    const hostIndex = units.findIndex((unit) => isSubsequence(block.media, unit.media));
    if (hostIndex >= 0) {
      // The record de-duplicates media the source repeats (a slider pair that
      // is also listed as `images`): an ordered subsequence is an equivalent
      // sequence, and the source construct is then accounted for.
      consumed[hostIndex] = true;
      report.push({ block: block.name, kind: "subsequence", units: [units[hostIndex].name] });
    } else {
      report.push({ block: block.name, kind: "unmatched", units: [] });
    }
  }
  return { report, unconsumed: units.filter((_, i) => !consumed[i]) };
}

/* ─────────────────────────── shared allow-lists ─────────────────────────── */

/**
 * Keys that used to be called by the case page itself but now come from the
 * shared renderer (same dictionary values) or were replaced by a literal
 * (a rewritten H1). Anything else disappearing from the page is a loss.
 */
const MOVED_TO_SHARED_RENDERER = new Set([
  "itCases.challenge",
  "itCases.solution",
  "itCases.results",
  "itCases.technicals",
  "itCases.nextStep",
  "itCases.nextStepDesc",
  "itCases.nextStepCta",
  "itCases.relatedProjects",
  "itCases.viewProject",
  "itCases.projectTeam",
  "designCases.projectTeam",
  "videoCases.projectTeam",
  "itCases.backToList",
  "videoCases.backToList",
  "designCases.nastyaPortraitRetouch.backToList",
]);
const REPLACED_BY_LITERAL = new Map([
  ["videoCases.cuprusLife.title", "H1 переписано в записі (див. texts.md, розділ 1)"],
  [
    "itCases.evaCode.description",
    "текст став підзаголовком запису: тип і склад роботи винесено в `subtitle`, лід більше не рендериться (texts.md, розділ 1)",
  ],
]);

/**
 * Differences that are expected and approved: each has a reason, so a
 * reviewer can check the decision instead of hunting for a lost file.
 */
const KNOWN_DIFFS = {
  "https://t.me/freelance_ua": "CTA переїхав на siteConfig.telegram.consultationUrl (п.9 правил редактури: Telegram з siteConfig, не стороння адреса)",
};

/* ─────────────────────────── main ─────────────────────────── */

const header = [
  "# Матеріали до / після — три перші кейси (Пакет 4)",
  "",
  "«До» — сторінка `app/cases/{d}/{slug}/` з незмінного коміту 33ef0b5 (до Пакета 4), «після» — запис реєстру `data/case-records/`.",
  "Перевіряє `scripts/package4-media-check.mjs`: покриття, склад, порядок, кратність, повторне використання, підписи, посилання, рендер HTML.",
  "",
];
const sections = [];
const summary = [];

for (const record of records) {
  const scope = record.id;
  const beforePath = `app/(uk)/cases/${record.direction}/${record.slug}/page.tsx`;
  const beforeLayout = `app/(uk)/cases/${record.direction}/${record.slug}/layout.tsx`;
  const pageSrc = indexSource(beforePath);
  const layoutSrc = indexSource(beforeLayout);
  // No baseline at all → this case cannot be verified, and comparing it against
  // empty content would fake a "nothing lost" verdict. Report it and skip.
  if (pageSrc == null && layoutSrc == null) {
    fail(
      scope,
      `відсутній baseline: у ${BASELINE_COMMIT} немає ${baselinePath(beforePath)} — звірку для цього кейсу виконати неможливо`,
    );
    sections.push(`${scope}: відсутній baseline (${baselinePath(beforePath)}) — не звірено`);
    continue;
  }
  const before = extract(pageSrc);
  const beforeOg = extract(layoutSrc)?.ogImage ?? null;

  const afterMedia = registry.collectRecordMedia(record, false).map(norm);
  const afterAll = registry.collectRecordMedia(record, true).map(norm);
  const renderList = recordRenderList(record);
  const renderCounts = new Map();
  for (const file of renderList) renderCounts.set(file, (renderCounts.get(file) ?? 0) + 1);

  // A click-to-load source (the hero's `fullSrc`, played only when the
  // fullscreen player opens) is never in the initial HTML — it must exist and
  // stay in the media set, but is excluded from the HTML-presence checks.
  const lazyFiles = new Set(
    [record.hero].filter((h) => h.kind === "video" && h.fullSrc).map((h) => norm(h.fullSrc)),
  );

  const findings = [];
  const note = (message) => findings.push(message);
  const bad = (message) => fail(scope, message);

  /* 1 — coverage: nothing in the record is invisible to collectRecordMedia */
  const walkAll = [...new Set(recordAllMedia(record))];
  const missingFromHelper = walkAll.filter((file) => !afterAll.includes(file));
  if (missingFromHelper.length) bad(`collectRecordMedia пропускає: ${missingFromHelper.join(", ")}`);
  else note("✓ усі /media/-значення запису потрапляють у `collectRecordMedia` (включно з poster відеовідгуку)");

  /* 2 — set equality */
  const mediaMissing = before.media.filter((m) => !afterMedia.includes(m));
  const mediaAdded = afterMedia.filter((m) => !before.media.includes(m));
  if (mediaMissing.length || mediaAdded.length) {
    bad(`склад медіа змінено: −${mediaMissing.length} +${mediaAdded.length}`);
  } else {
    note(`✓ склад медіа ідентичний (${before.media.length} файлів)`);
  }

  /* 3 — order: record blocks vs source constructs */
  const units = [
    ...before.groups.map((g) => ({ name: `const ${g.name}`, media: g.media })),
    ...before.inline.map((file, i) => ({ name: `inline#${i + 1} (${file.split("/").pop()})`, media: [file] })),
  ];
  const order = matchOrder(recordBlocks(record), units);
  // A source construct that is never a rendered block (a `Set` of media paths,
  // a re-declared constant) only matters when the record does not carry its
  // files at all — that is a real loss. A construct that the page still
  // CONSUMES elsewhere (e.g. `mobileSplitItems.has(src)` driving the
  // responsive split) is live source logic, not dead code.
  const referencedInSource = (name) => {
    const ident = name.replace(/^const\s+/, "");
    if (!/^[A-Za-z_$][\w$]*$/.test(ident)) return false;
    const hits = [...pageSrc.matchAll(new RegExp(`\\b${ident}\\b`, "g"))].length;
    return hits > 1;
  };
  const recordFiles = new Set(registry.collectRecordMedia(record, false).map(norm));
  const reallyLost = order.unconsumed.filter((unit) => unit.media.some((file) => !recordFiles.has(file)));
  const usedInLogic = order.unconsumed.filter((unit) => !reallyLost.includes(unit) && referencedInSource(unit.name));
  const trulyUnused = order.unconsumed.filter((unit) => !reallyLost.includes(unit) && !usedInLogic.includes(unit));
  const unmatched = order.report.filter((r) => r.kind === "unmatched");
  if (unmatched.length) bad(`порядок не підтверджено для: ${unmatched.map((r) => r.block).join(", ")}`);
  if (order.unconsumed.length) {
    if (reallyLost.length) {
      bad(`джерельні конструкції без файлів у записі: ${reallyLost.map((u) => u.name).join(", ")}`);
    } else {
      if (usedInLogic.length) {
        note(`✓ джерельні конструкції, які сторінка споживає в логіці (${usedInLogic.length}): ${usedInLogic.map((u) => u.name).join(", ")} — не рендеряться самі по собі, але керують показом (напр., responsive-розбиття через .has())`);
      }
      if (trulyUnused.length) {
        note(`✓ нерендерні джерельні конструкції без інших вживань (${trulyUnused.length}): ${trulyUnused.map((u) => u.name).join(", ")} — їхні файли є в записі`);
      }
    }
  }
  if (!unmatched.length && !order.unconsumed.length) {
    note("✓ порядок блоків запису відповідає порядку джерельних конструкцій (точні збіги й підпослідовності)");
  }

  /* 4 — captions */
  const texts = recordTexts(record);
  const emptyKeys = texts.keys.filter(({ key }) => {
    const uk = translations.uk[key];
    const en = translations.en[key];
    return !uk || !en;
  });
  if (emptyKeys.length) bad(`ключі без тексту в одній з мов: ${emptyKeys.map((k) => `${k.key}@${k.at}`).join(", ")}`);
  else note(`✓ ключі запису з текстом в обох мовах: ${texts.keys.length}`);

  const emptyLiterals = texts.literals.filter((l) => !l.uk.trim() || !l.en.trim());
  if (emptyLiterals.length) bad(`порожні літерали: ${emptyLiterals.map((l) => l.at).join(", ")}`);
  else note(`✓ літерали, заповнені в обох мовах: ${texts.literals.length}`);

  const beforeCaptionKeys = before.captionKeys;
  const recordKeys = new Set(texts.keys.map((k) => k.key));
  const lostCaptions = beforeCaptionKeys.filter(
    (key) => !recordKeys.has(key) && !MOVED_TO_SHARED_RENDERER.has(key) && !REPLACED_BY_LITERAL.has(key),
  );
  if (lostCaptions.length) bad(`втрачені підписи: ${lostCaptions.join(", ")}`);
  else note(`✓ підписи оригінальної сторінки збережені (або пояснені): ${beforeCaptionKeys.length}`);

  // Visible text is never lost silently: every key the original page rendered
  // must be in the record, in the shared renderer (explicit list) or in an
  // approved editorial change (explicit list). Anything else FAILS — an
  // unexplained loss must not look like a PASS.
  //
  // A rewritten H1 is an approved editorial change: when the record's H1 is a
  // literal (not the card title key), the catalogue card still reuses that
  // key, so it is not a loss — it is excluded here.
  const rewrittenTitle = record.h1 && !isKeyRef(record.h1) ? cardTitleKey(record) : null;
  const unexplainedKeys = before.keys.filter(
    (key) =>
      !recordKeys.has(key) &&
      !MOVED_TO_SHARED_RENDERER.has(key) &&
      !REPLACED_BY_LITERAL.has(key) &&
      key !== rewrittenTitle,
  );
  if (rewrittenTitle && before.keys.includes(rewrittenTitle)) {
    note(`✓ H1 переписано в записі (літерал) — картка каталогу використовує ключ ${rewrittenTitle}`);
  }
  if (unexplainedKeys.length) {
    bad(`невідома втрата видимого тексту: ${unexplainedKeys.join(", ")}`);
  } else {
    note(`✓ усі ${before.keys.length} ключів вихідної сторінки мають дім: запис, спільний рендерер або погоджена правка`);
  }

  /* 5 — links keep URL and label */
  const afterLinks = recordLinks(record);
  const lostLinks = [];
  for (const link of before.links) {
    const found = afterLinks.find((l) => l.url === link.url);
    if (!found) {
      if (KNOWN_DIFFS[link.url]) continue;
      lostLinks.push(`${link.url} (немає в записі)`);
      continue;
    }
    if (link.labelKey && found.labelKey && link.labelKey !== found.labelKey) {
      lostLinks.push(`${link.url}: підпис ${link.labelKey} → ${found.labelKey}`);
    }
    if (link.labelKey && !found.labelKey) {
      lostLinks.push(`${link.url}: ключ підпису ${link.labelKey} замінено на літерал`);
    }
  }
  if (lostLinks.length) bad(`посилання/підписи: ${lostLinks.join("; ")}`);
  else note(`✓ зовнішні посилання збережено разом із підписами: ${before.links.length}`);

  const linksAdded = afterLinks.filter((l) => !before.links.some((b) => b.url === l.url));
  if (linksAdded.length) note(`(+ ${linksAdded.length} посилань з'явилося: ${linksAdded.map((l) => l.url).join(", ")})`);

  /* 6 — OG cover kept (origin ignored: the layout stored an absolute URL) */
  const ogPath = (value) => norm(value).replace(/^https?:\/\/[^/]+/, "");
  const ogKept = !beforeOg || ogPath(beforeOg) === ogPath(record.seo.ogImage);
  if (!ogKept) bad(`OG-image змінено: ${beforeOg} → ${record.seo.ogImage}`);
  else if (beforeOg) note(`✓ OG-image збережено: ${record.seo.ogImage}`);

  /* 7 — rendered HTML: presence, order, multiplicity */
  const htmlRows = [];
  for (const pagePath of [record.uaPath, record.enPath]) {
    let html;
    try {
      const res = await fetch(`${BASE}${pagePath}`);
      if (res.status !== 200) {
        bad(`${pagePath}: статус ${res.status}`);
        htmlRows.push({ pagePath, found: 0, total: afterMedia.length, ordered: false, counts: false, missing: [`status ${res.status}`] });
        continue;
      }
      html = await res.text();
    } catch (err) {
      bad(`${pagePath}: ${err.message}`);
      continue;
    }

    const counts = htmlRenderCounts(html);
    const missing = afterMedia.filter((file) => !counts.has(file) && !lazyFiles.has(file));
    const countMismatch = [];
    for (const [file, want] of renderCounts) {
      const got = counts.get(file) ?? 0;
      if (got !== want) countMismatch.push(`${file}: ${got}≠${want}`);
    }
    // Per-block DOM order: inside each rendered block the media must follow
    // the record's item order. Scoping to the block keeps a file the hero
    // re-uses out of the gallery's sequence (its first occurrence is early
    // for a legitimate reason) while still catching re-grouping, which is
    // exactly what a "sliders first, statics after" renderer would break.
    const orderProblems = [];
    for (const { block, items } of recordBlockItems(record)) {
      const inner = elementInner(html, block);
      if (inner === null) {
        orderProblems.push(`${block}: блок не знайдено в HTML`);
        continue;
      }
      const domFiles = [];
      for (const tag of inner.match(/<(?:img|video|audio|source)\b[^>]*>/g) ?? []) {
        for (const raw of [tag.match(/\bsrc="([^"]+)"/)?.[1], tag.match(/\bposter="([^"]+)"/)?.[1]]) {
          if (!raw) continue;
          let file = raw;
          const query = raw.match(/[?&]url=([^&"]+)/);
          if (query) {
            try { file = decodeURIComponent(query[1]); } catch { continue; }
          }
          file = norm(file);
          if (file.startsWith("/media/")) domFiles.push(file);
        }
      }
      // A file that several items reference (the same screenshot reused by two
      // blocks) cannot say anything about the order — it is skipped for the
      // ordering verdict but still marks its items as rendered.
      const owners = new Map();
      items.forEach((group, itemIndex) => {
        for (const file of group) {
          if (!owners.has(file)) owners.set(file, new Set());
          owners.get(file).add(itemIndex);
        }
      });
      let previous = -1;
      const seenItems = new Set();
      for (const file of domFiles) {
        const itemIndexes = owners.get(file);
        if (!itemIndexes) {
          // A file rendered by the SAME record earlier — e.g. a video poster
          // that later serves as the review video's poster attribute — is a
          // legitimate reuse, not an unknown loss or addition.
          if (afterMedia.includes(file)) continue;
          orderProblems.push(`${block}: у HTML є файл поза записом (${file})`);
          continue;
        }
        for (const itemIndex of itemIndexes) seenItems.add(itemIndex);
        if (itemIndexes.size === 1) {
          const itemIndex = [...itemIndexes][0];
          if (itemIndex < previous) {
            orderProblems.push(`${block}: елемент ${itemIndex} з'явився раніше елемента ${previous}`);
          }
          previous = itemIndex;
        }
      }
      const missingItems = items.map((_, i) => i).filter((i) => !seenItems.has(i));
      if (missingItems.length) orderProblems.push(`${block}: без медіа елементи ${missingItems.join(", ")}`);
    }

    if (missing.length) bad(`${pagePath}: у HTML бракує ${missing.join(", ")}`);
    if (countMismatch.length) bad(`${pagePath}: кратність рендеру — ${countMismatch.join("; ")}`);
    if (orderProblems.length) bad(`${pagePath}: порядок — ${orderProblems.join("; ")}`);

    // Explicit responsive-split presentation (`presentation.splitMobile`):
    // each rendered instance must keep the whole image (desktop) and its two
    // mobile halves of the same file.
    const expectSplits = [];
    for (const section of record.sections) {
      if (section.kind === "gallery") {
        section.items.forEach((item) => {
          if (item.presentation?.splitMobile) expectSplits.push(item);
        });
      }
      if (section.kind === "galleryGroups") {
        section.groups.forEach((group) =>
          group.items.forEach((item) => {
            if (item.presentation?.splitMobile) expectSplits.push(item);
          }),
        );
      }
    }
    const splitParts = { left: [], right: [] };
    for (const m of html.matchAll(/<div[^>]*\bdata-case-split-part="(left|right)"[^>]*>([\s\S]*?)<\/div>/g)) {
      let raw = m[2].match(/src="([^"]+)"/)?.[1] ?? "";
      const query = raw.match(/[?&]url=([^&"]+)/);
      if (query) {
        try {
          raw = decodeURIComponent(query[1]);
        } catch {
          /* keep raw */
        }
      }
      splitParts[m[1]].push(norm(raw));
    }
    const splitProblems = [];
    for (const item of expectSplits) {
      const file = norm(item.src);
      const lefts = splitParts.left.filter((f) => f === file).length;
      const rights = splitParts.right.filter((f) => f === file).length;
      if (lefts !== 1 || rights !== 1) splitProblems.push(`${file}: mobile-частини ${lefts}/${rights} ≠ 1/1`);
    }
    const knownSplits = new Set(expectSplits.map((item) => norm(item.src)));
    for (const file of [...splitParts.left, ...splitParts.right]) {
      if (!knownSplits.has(file)) splitProblems.push(`split-part для файлу поза записом: ${file}`);
    }
    if (splitProblems.length) bad(`${pagePath}: responsive-розбиття — ${splitProblems.join("; ")}`);
    else if (expectSplits.length) note(`✓ responsive-розбиття: кожен split-файл має рівно дві mobile-частини (${expectSplits.length} файл(и))`);

    htmlRows.push({
      pagePath,
      found: afterMedia.length - missing.length,
      total: afterMedia.length,
      ordered: orderProblems.length === 0,
      countsOk: countMismatch.length === 0,
      missing,
    });
  }
  if (htmlRows.every((r) => r.missing?.length === 0 && r.ordered && r.countsOk)) {
    note("✓ обидві мови: усі файли в HTML, порядок запису збережено, кратність рендеру збігається");
  }

  summary.push({
    id: record.id,
    mediaBefore: before.media.length,
    mediaAfter: afterMedia.length,
    mediaOk: mediaMissing.length === 0 && mediaAdded.length === 0,
    orderOk: !unmatched.length && !reallyLost.length,
    captionsOk: !lostCaptions.length && !emptyKeys.length && !emptyLiterals.length,
    linksBefore: before.links.length,
    linksAfter: afterLinks.length,
    ogOk: ogKept,
    keysBefore: before.keys.length,
    keysAfter: texts.keys.length,
    htmlRows,
  });

  sections.push(`## \`${record.id}\``);
  sections.push("");
  sections.push("| Тип | До | Після | Різниця |");
  sections.push("|---|---|---|---|");
  sections.push(`| Медіа (сторінка) | ${before.media.length} | ${afterMedia.length} | ${mediaOk(before, mediaMissing, mediaAdded)} |`);
  sections.push(`| Зовнішні лінки | ${before.links.length} | ${afterLinks.length} | ${before.links.filter((l) => !afterLinks.some((a) => a.url === l.url)).length ? "див. нижче" : "без змін"} |`);
  sections.push(`| Ключі i18n на сторінці | ${before.keys.length} | ${texts.keys.length} | див. пояснення |`);
  sections.push(`| OG-image | ${beforeOg ?? "—"} | ${record.seo.ogImage} | ${ogKept ? "збережено" : "ЗМІНЕНО"} |`);
  sections.push("");
  sections.push("**Що перевірено:**");
  sections.push(...findings.map((f) => `- ${f}`));
  sections.push("");

  sections.push("**Порядок блоків (запис ← джерело):**");
  sections.push("");
  sections.push("| Блок запису | Збіг | Джерельні конструкції |");
  sections.push("|---|---|---|");
  for (const row of order.report) {
    sections.push(`| \`${row.block}\` | ${row.kind === "exact" ? "точний" : row.kind === "subsequence" ? "підпослідовність" : "НЕ ЗНАЙДЕНО"} | ${row.units.join(" + ") || "—"} |`);
  }
  sections.push("");

  sections.push("**Рендер HTML (обидві мови):**");
  sections.push("");
  sections.push("| Сторінка | Медіа в HTML | Порядок | Кратність |");
  sections.push("|---|---|---|---|");
  for (const row of htmlRows) {
    sections.push(`| \`${row.pagePath}\` | ${row.found}/${row.total} | ${row.ordered ? "✓" : "✗"} | ${row.countsOk ? "✓" : "✗"} |`);
  }
  sections.push("");

  const linksDiff = before.links.filter((l) => !afterLinks.some((a) => a.url === l.url));
  if (linksDiff.length) {
    sections.push("**Лінки:**");
    for (const link of linksDiff) sections.push(`- ${link.url} — ${KNOWN_DIFFS[link.url] ?? "невідома причина (перевірити!)"}`);
    sections.push("");
  }

  sections.push("**Ключі i18n:**");
  sections.push("");
  sections.push("| Ключ | До (сторінка) | Після (запис) | Пояснення |");
  sections.push("|---|---|---|---|");
  for (const key of before.keys.filter((k) => !recordKeys.has(k))) {
    const why = MOVED_TO_SHARED_RENDERER.has(key)
      ? "спільний підпис секції — викликається з components/cases/CaseDetail.tsx тим самим значенням"
      : REPLACED_BY_LITERAL.get(key)
        ?? "невідома причина (перевірити!)";
    sections.push(`| \`${key}\` | так | ні | ${why} |`);
  }
  for (const key of [...recordKeys].filter((k) => !before.keys.includes(k))) {
    sections.push(`| \`${key}\` | ні | так | ${key.startsWith(record.id.split("/")[1]) || key.includes(record.slug.replace(/-/g, "")) ? "ключ цього кейсу тепер використовується записом (метадані/alt)" : "новий або перенесений у запис ключ"} |`);
  }
  sections.push("");
}

function mediaOk(before, missing, added) {
  return missing.length || added.length ? `−${missing.length} / +${added.length}` : "без змін";
}

/* ── reuse across cases ── */
const reuseRows = [];
/** Records whose baseline page could not be read from BASELINE_COMMIT. */
const missingBaselines = [];
{
  const beforeMap = new Map();
  const afterMap = new Map();
  for (const record of records) {
    const src = indexSource(`app/(uk)/cases/${record.direction}/${record.slug}/page.tsx`);
    // Same rule as above: an absent baseline is a reported gap, not an empty page.
    if (src == null) {
      missingBaselines.push(`${record.id} (${baselinePath(`app/(uk)/cases/${record.direction}/${record.slug}/page.tsx`)})`);
      continue;
    }
    for (const file of new Set([...sourceArrayGroups(src).groups.flatMap((g) => g.media), ...sourceInlineMedia(src, sourceArrayGroups(src).masked)])) {
      if (!beforeMap.has(file)) beforeMap.set(file, new Set());
      beforeMap.get(file).add(record.id);
    }
  }
  // The 97 untouched cases read from the worktree; for the three reworked ones
  // the record is the truth.
  const legacy = [];
  for (const direction of ["it", "design", "video"]) {
    const base = path.join(process.cwd(), "app/(uk)/cases", direction);
    if (!fs.existsSync(base)) continue;
    for (const name of fs.readdirSync(base)) {
      const file = path.join(base, name, "page.tsx");
      if (!fs.existsSync(file)) continue;
      if (records.some((r) => r.id === `${direction}/${name}`)) continue;
      legacy.push({ id: `${direction}/${name}`, src: fs.readFileSync(file, "utf8") });
    }
  }
  for (const { id, src } of legacy) {
    const { groups, masked } = sourceArrayGroups(src);
    const files = new Set([...groups.flatMap((g) => g.media), ...sourceInlineMedia(src, masked)]);
    for (const file of files) {
      if (!beforeMap.has(file)) beforeMap.set(file, new Set());
      beforeMap.get(file).add(id);
    }
  }
  for (const record of records) {
    for (const file of new Set(registry.collectRecordMedia(record, false).map(norm))) {
      if (!afterMap.has(file)) afterMap.set(file, new Set());
      afterMap.get(file).add(record.id);
    }
  }
  for (const { id, src } of legacy) {
    const { groups, masked } = sourceArrayGroups(src);
    const files = new Set([...groups.flatMap((g) => g.media), ...sourceInlineMedia(src, masked)]);
    for (const file of files) {
      if (!afterMap.has(file)) afterMap.set(file, new Set());
      afterMap.get(file).add(id);
    }
  }

  const diff = [];
  const allFiles = new Set([...beforeMap.keys(), ...afterMap.keys()]);
  for (const file of allFiles) {
    const a = [...(beforeMap.get(file) ?? [])].sort().join(",");
    const b = [...(afterMap.get(file) ?? [])].sort().join(",");
    if (a !== b) diff.push(`${file}: [${a}] → [${b}]`);
  }
  if (diff.length) fail("повторне використання", `змінився набір кейсів: ${diff.join("; ")}`);

  const shared = [...afterMap.entries()]
    .filter(([, cases]) => cases.size > 1)
    .map(([file, cases]) => ({ file, cases: [...cases].sort() }));
  reuseRows.push(...shared);
  if (!diff.length) {
    sections.unshift(
      "**Повторне використання файлів** (спільні медіа не змінили власника):",
      "",
      "| Файл | Кейси |",
      "|---|---|",
      ...shared.map((row) => `| \`${row.file}\` | ${row.cases.join(", ")} |`),
      "",
      diff.length ? "" : "✓ набори кейсів для кожного файлу збігаються до/після.",
      "",
    );
  }
}

/* ── summary table ── */
const summaryTable = [
  "| Кейс | Медіа | Порядок | Підписи | Лінки до/після | OG | HTML (6 перевірок) |",
  "|---|---|---|---|---|---|---|",
  ...summary.map((row) => {
    const htmlOk = row.htmlRows.every((r) => r.missing?.length === 0 && r.ordered && r.countsOk);
    return `| \`${row.id}\` | ${row.mediaBefore}→${row.mediaAfter} ${row.mediaOk ? "✓" : "✗"} | ${row.orderOk ? "✓" : "✗"} | ${row.captionsOk ? "✓" : "✗"} | ${row.linksBefore}→${row.linksAfter} | ${row.ogOk ? "✓" : "✗"} | ${htmlOk ? "✓" : "✗"} |`;
  }),
  "",
  failures.length === 0
    ? `**Результат: склад, порядок, кратність, повторне використання, підписи, посилання та OG-image збережено для всіх ${summary.length} кейсів.**`
    : `**Результат: ${failures.length} порушень** — див. перелік нижче.`,
  "",
  `Baseline: сторінки \`app/cases/{d}/{slug}/\` з незмінного коміту \`${BASELINE_COMMIT}\` (не з git-індексу, не з HEAD).`,
  missingBaselines.length === 0
    ? `Baseline знайдено для всіх ${records.length} кейсів; звірених кейсів: ${summary.length}.`
    : `⚠️ Відсутній baseline для ${missingBaselines.length}: ${missingBaselines.join(", ")} — ці кейси НЕ звірені.`,
  "",
];

const report = [
  ...header,
  ...summaryTable,
  ...(failures.length ? ["### Порушення", "", ...failures.map((f) => `- ✗ ${f}`), ""] : []),
  ...sections,
];

fs.writeFileSync(OUT, report.join("\n"));

console.log(
  summary
    .map((row) => `${row.id}: media ${row.mediaBefore}→${row.mediaAfter} ${row.mediaOk ? "OK" : "MISMATCH"}, order ${row.orderOk ? "OK" : "FAIL"}, captions ${row.captionsOk ? "OK" : "FAIL"}, links ${row.linksBefore}→${row.linksAfter}`)
    .join("\n"),
);
if (failures.length) {
  console.error(`\n${failures.length} violation(s):`);
  for (const f of failures) console.error(`  - ${f}`);
}
if (missingBaselines.length) {
  console.error(`\n${missingBaselines.length} missing baseline(s) — not verified: ${missingBaselines.join(", ")}`);
}
console.log(`baseline commit: ${BASELINE_COMMIT} · verified ${summary.length}/${records.length} records · ${missingBaselines.length} without baseline`);
console.log(`report: ${path.relative(process.cwd(), OUT)}`);
process.exit(failures.length === 0 ? 0 : 1);
