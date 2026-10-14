// Pure URL/metadata check helpers shared by scripts/check-urls.mjs (CLI) and
// scripts/check-urls.selftest.mjs (control checks). No I/O here — every helper
// returns a verdict object so the same rules are unit-testable.
//
// Rules encoded (per approved Package 2 spec):
//   - canonical and hreflang are compared as FULL absolute URLs
//     (protocol + host + path; only the root trailing slash is tolerated);
//   - hreflang reciprocity is verified per SOURCE page language: a UA page
//     that declares hreflang "en" → EN URL must find on the EN page a
//     hreflang "uk" pointing back to the UA URL, and vice versa;
//   - an active redirect's final destination must return 200 — 404/500 fails.
//     The same rules apply to `redirect` expectations and `redirectPlannedTo`;
//   - category redirect expectations keep the `#cases` fragment; the fragment
//     must be present in the Location header. Actual scrolling and the offset
//     from the fixed header are verified by a browser scenario, not here.

/** Normalize an absolute URL for comparison: no hash, host root gets no trailing slash. */
export function normalizeAbsUrl(u) {
  if (u == null) return null;
  let s = String(u).trim();
  // allow bare paths in expectations
  if (!/^https?:\/\//i.test(s)) s = `https://freelance-ua.agency${s.startsWith("/") ? s : `/${s}`}`;
  try {
    const url = new URL(s);
    url.hash = "";
    let out = url.toString();
    if (url.pathname === "/" && out.endsWith("/")) out = out.slice(0, -1);
    return out;
  } catch {
    return s;
  }
}

/** Split "https://host/path#frag" → { path, fragment } (fragment keeps "#…"). */
export function splitFragment(url) {
  const s = String(url ?? "");
  const i = s.indexOf("#");
  if (i < 0) return { path: s, fragment: "" };
  return { path: s.slice(0, i), fragment: s.slice(i) };
}

/** Compare canonical: full absolute URL equality (root trailing slash tolerated). */
export function checkCanonical(actualCanonical, expectedCanonical) {
  const a = normalizeAbsUrl(actualCanonical);
  const e = normalizeAbsUrl(expectedCanonical);
  return { name: "canonical", ok: a === e, expected: e, actual: a };
}

/**
 * hreflang presence for one page: every expected language must be declared
 * with the exact absolute URL.
 */
export function checkHreflangDeclarations(actualHreflang, expectedLanguages, origin) {
  const checks = [];
  for (const [lang, path] of Object.entries(expectedLanguages ?? {})) {
    const want = normalizeAbsUrl(`${origin}${path === "/" ? "" : path}` || origin);
    const found = (actualHreflang ?? []).find((h) => h.lang === lang);
    checks.push({
      name: `hreflang-${lang}`,
      ok: !!found && normalizeAbsUrl(found.href) === want,
      expected: want,
      actual: found?.href ?? null,
    });
  }
  return checks;
}

/**
 * Reciprocal hreflang between a crawled pair, by SOURCE page language.
 *
 * source = { path, lang, hreflang:[{lang, href}] }  (the page being checked)
 * target = { path, status, lang, hreflang:[...] }   (its declared counterpart)
 *
 * The source must declare `target.lang` → target.path; the target must
 * declare `source.lang` → source.path. A missing or wrong back-link fails.
 */
export function checkHreflangReciprocal(source, target, origin) {
  if (!target || target.status !== 200) {
    return { ok: null, reason: "counterpart-not-ready" };
  }
  const declared = (source.hreflang ?? []).find(
    (h) => h.lang === target.lang && normalizeAbsUrl(h.href) === normalizeAbsUrl(`${origin}${target.path === "/" ? "" : target.path}`)
  );
  if (!declared) {
    return { ok: false, reason: "source-missing-forward-link", from: source.path, to: target.path };
  }
  const wantBack = normalizeAbsUrl(`${origin}${source.path === "/" ? "" : source.path}`);
  const back = (target.hreflang ?? []).find(
    (h) => h.lang === source.lang && normalizeAbsUrl(h.href) === wantBack
  );
  if (!back) {
    return {
      ok: false,
      reason: "target-missing-reciprocal",
      detail: `target ${target.path} must declare hreflang "${source.lang}" → ${wantBack}`,
      from: source.path,
      to: target.path,
    };
  }
  return { ok: true, from: source.path, to: target.path, viaLang: target.lang };
}

/**
 * Check an HTTP redirect response.
 *
 * res       = { status, location }          (redirect: "manual" response)
 * expected  = { statuses: [301,308], to }   (`to` may contain "#fragment")
 * destStatus = HTTP status of the final destination (fetch once); required:
 *              the destination must return 200 — 404/500 fails.
 *
 * Fragment rule: when `expected.to` contains a fragment, the Location header
 * must carry the same fragment (category redirects keep `#cases`).
 */
export function checkRedirect(res, expected, destStatus) {
  const checks = [];
  const statuses = expected.statuses ?? [301, 308];
  checks.push({
    name: "redirect-status",
    ok: statuses.includes(res.status),
    expected: statuses,
    actual: res.status,
  });
  const loc = res.location ?? "";
  const want = expected.to ?? "";
  const locParts = splitFragment(loc);
  const wantParts = splitFragment(want);
  // path part: compare as absolute URLs
  checks.push({
    name: "redirect-location",
    ok: normalizeAbsUrl(locParts.path) === normalizeAbsUrl(wantParts.path),
    expected: normalizeAbsUrl(wantParts.path),
    actual: locParts.path || null,
  });
  // fragment: required when the expectation carries one
  if (wantParts.fragment) {
    checks.push({
      name: "redirect-fragment",
      ok: locParts.fragment === wantParts.fragment,
      expected: wantParts.fragment,
      actual: locParts.fragment || null,
      note: "scroll to the anchor and header offset are verified by the browser scenario",
    });
  }
  // final destination must be a working page
  checks.push({
    name: "redirect-destination-200",
    ok: destStatus === 200,
    expected: 200,
    actual: destStatus ?? null,
  });
  return checks;
}

/**
 * Pixel size + MIME of an image buffer (JPEG/PNG/WebP/GIF).
 *
 * Pure and independent of the site's own helper on purpose: the checker must
 * not reuse the code it is checking. Unknown formats return null.
 */
export function measureImageBuffer(buf) {
  if (!buf || buf.length < 24) return null;
  // PNG: signature + IHDR
  if (buf.readUInt32BE(0) === 0x89504e47 && buf.readUInt32BE(4) === 0x0d0a1a0a) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), mime: "image/png" };
  }
  // GIF
  if (buf.toString("ascii", 0, 3) === "GIF") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8), mime: "image/gif" };
  }
  // JPEG: walk segments to the first SOFn
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marker = buf[i + 1];
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
        i += 2;
        continue;
      }
      if (marker >= 0xc0 && marker <= 0xc3) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5), mime: "image/jpeg" };
      }
      const length = buf.readUInt16BE(i + 2);
      if (length < 2) return null;
      i += 2 + length;
    }
    return null;
  }
  // WebP
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1, mime: "image/webp" };
    }
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff, mime: "image/webp" };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1, mime: "image/webp" };
    }
    return null;
  }
  return null;
}

/**
 * Open Graph image properties.
 *
 * `declared` = { url, width, height, type } as read from the page.
 * `actual`   = { width, height, mime } measured from the served file, or null
 *              when the file is not available locally.
 *
 * Rules (approved for this fix):
 *   - declaring only the url is valid — width/height/type are optional;
 *   - if any of them is declared, all three must be, and they must match the
 *     real file: a wrong size or MIME type misleads every crawler that reads
 *     the card, and the previous checker did not look at them at all;
 *   - without a measurable file only the completeness rule can be enforced.
 */
export function checkOgImage(declared, actual) {
  const url = declared?.url ?? null;
  const width = declared?.width ?? null;
  const height = declared?.height ?? null;
  const type = declared?.type ?? null;
  if (!url) return [{ name: "og-image-present", ok: false, actual: null }];

  const checks = [{ name: "og-image-present", ok: true, actual: url }];
  const given = [width, height, type].filter((v) => v != null && String(v).trim() !== "").length;
  if (given === 0) {
    checks.push({ name: "og-image-props", ok: true, actual: "omitted", note: "width/height/type are optional and unknown here" });
    return checks;
  }
  if (given !== 3) {
    checks.push({
      name: "og-image-props",
      ok: false,
      expected: "width, height and type together — or none of them",
      actual: JSON.stringify({ width, height, type }),
    });
    return checks;
  }
  if (!actual) {
    checks.push({
      name: "og-image-props",
      ok: true,
      actual: "declared, file not measurable locally",
      note: "completeness checked; size/format cannot be verified for this URL",
    });
    return checks;
  }
  checks.push({ name: "og-image-width", ok: Number(width) === actual.width, expected: actual.width, actual: Number(width) });
  checks.push({ name: "og-image-height", ok: Number(height) === actual.height, expected: actual.height, actual: Number(height) });
  checks.push({ name: "og-image-type", ok: type === actual.mime, expected: actual.mime, actual: type });
  return checks;
}

/** Visible-text raw i18n keys must never leak. */
export function checkNoRawKeys(rawKeys) {
  return { name: "no-raw-i18n-keys", ok: (rawKeys ?? []).length === 0, actual: rawKeys ?? [] };
}
