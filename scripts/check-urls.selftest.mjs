// Control checks for the URL checker rules (scripts/lib/urlchecks.mjs).
// Each case runs the same pure functions the CLI uses and asserts the verdict.
//
// Coverage required by the approved Package 2 spec:
//   ✓ a correct UA↔EN language pair passes reciprocity;
//   ✗ a canonical on the wrong domain fails;
//   ✗ a missing reciprocal hreflang fails;
//   ✗ a redirect whose destination returns 404 fails;
//   ✗ a redirect missing the required #fragment fails;
//   ✓ a redirect carrying #cases to a 200 destination passes.
//
// Usage: node scripts/check-urls.selftest.mjs   (exit 0 = all pass, 1 = fail)
import fs from "node:fs";
import path from "node:path";
import {
  normalizeAbsUrl,
  splitFragment,
  checkCanonical,
  checkHreflangDeclarations,
  checkHreflangReciprocal,
  checkRedirect,
  checkOgImage,
  measureImageBuffer,
} from "./lib/urlchecks.mjs";

const ORIGIN = "https://freelance-ua.agency";
let passed = 0;
let failed = 0;

function expect(name, cond, detail) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.error(`  ✗ ${name}${detail ? ` — ${JSON.stringify(detail)}` : ""}`);
  }
}

console.log("control checks: hreflang reciprocity");

// 1. Correct language pair passes: UA declares en→EN, EN declares uk→UA.
{
  const ua = { path: "/", lang: "uk", status: 200, hreflang: [{ lang: "en", href: "https://freelance-ua.agency/en" }] };
  const en = { path: "/en", lang: "en", status: 200, hreflang: [{ lang: "uk", href: "https://freelance-ua.agency/" }] };
  const v = checkHreflangReciprocal(ua, en, ORIGIN);
  expect("correct UA→EN pair passes", v.ok === true, v);
  const back = checkHreflangReciprocal(en, ua, ORIGIN);
  expect("correct EN→UA pair passes", back.ok === true, back);
}

// 2. Canonical on the wrong domain fails.
{
  const v = checkCanonical("https://evil.example/cases", "https://freelance-ua.agency/cases");
  expect("canonical on wrong domain fails", v.ok === false, v);
  const ok = checkCanonical("https://freelance-ua.agency/cases", "https://freelance-ua.agency/cases");
  expect("canonical full absolute URL passes", ok.ok === true, ok);
  const rootSlash = checkCanonical("https://freelance-ua.agency/", "https://freelance-ua.agency");
  expect("root trailing slash tolerated", rootSlash.ok === true, rootSlash);
}

// 3. Missing reciprocal hreflang fails.
{
  const ua = { path: "/cases", lang: "uk", status: 200, hreflang: [{ lang: "en", href: "https://freelance-ua.agency/en/cases" }] };
  const enNoBack = { path: "/en/cases", lang: "en", status: 200, hreflang: [] };
  const v = checkHreflangReciprocal(ua, enNoBack, ORIGIN);
  expect("missing reciprocal hreflang fails", v.ok === false && v.reason === "target-missing-reciprocal", v);

  const enWrongBack = { path: "/en/cases", lang: "en", status: 200, hreflang: [{ lang: "uk", href: "https://freelance-ua.agency/" }] };
  const v2 = checkHreflangReciprocal(ua, enWrongBack, ORIGIN);
  expect("reciprocal pointing to the wrong URL fails", v2.ok === false, v2);

  const notReady = checkHreflangReciprocal(ua, { path: "/en/cases", lang: "en", status: 404, hreflang: [] }, ORIGIN);
  expect("counterpart not ready is skipped (no false pair)", notReady.ok === null, notReady);
}

// 4. hreflang declaration must use the full absolute URL (self-inclusive cluster).
{
  const decls = checkHreflangDeclarations(
    [
      { lang: "uk", href: "https://freelance-ua.agency/" },
      { lang: "en", href: "https://freelance-ua.agency/en" },
    ],
    { uk: "/", en: "/en" },
    ORIGIN,
  );
  expect("declaration of own canonical + counterpart", decls.every((c) => c.ok), decls);
  const missingSelf = checkHreflangDeclarations(
    [{ lang: "en", href: "https://freelance-ua.agency/en" }],
    { uk: "/", en: "/en" },
    ORIGIN,
  );
  expect(
    "missing self hreflang fails",
    missingSelf.some((c) => c.name === "hreflang-uk" && c.ok === false),
    missingSelf,
  );
  const wrongHost = checkHreflangDeclarations(
    [{ lang: "en", href: "https://evil.example/en" }],
    { en: "/en" },
    ORIGIN,
  );
  expect("hreflang to a foreign host fails", wrongHost.every((c) => c.ok === false), wrongHost);
}

console.log("control checks: redirects");

// 5. Redirect to a 404 destination fails.
{
  const checks = checkRedirect(
    { status: 308, location: "/services/it#cases" },
    { statuses: [301, 308], to: "/services/it#cases" },
    404,
  );
  const dest = checks.find((c) => c.name === "redirect-destination-200");
  expect("redirect destination 404 fails", dest.ok === false, dest);
}

// 6. Redirect missing the required #fragment fails.
{
  const checks = checkRedirect(
    { status: 308, location: "/services/it" },
    { statuses: [301, 308], to: "/services/it#cases" },
    200,
  );
  const frag = checks.find((c) => c.name === "redirect-fragment");
  expect("missing required #fragment fails", frag.ok === false, frag);
}

// 7. Correct category redirect (with #cases, destination 200) passes.
{
  const checks = checkRedirect(
    { status: 308, location: "https://freelance-ua.agency/services/it#cases" },
    { statuses: [301, 308], to: "/services/it#cases" },
    200,
  );
  expect("correct redirect with #cases passes", checks.every((c) => c.ok), checks);
}

// 8. Helpers sanity.
{
  expect("splitFragment keeps fragment", splitFragment("/a#cases").fragment === "#cases");
  expect("normalizeAbsUrl strips hash", normalizeAbsUrl("https://x.ua/a#f") === "https://x.ua/a");
}

console.log("control checks: og:image properties");

// 9. Measurement of the real covers (independent probe).
{
  const read = (p) => fs.readFileSync(path.join(process.cwd(), "public", p));
  const jpeg = measureImageBuffer(read("og-image.jpg"));
  expect("og-image.jpg measured as 1200x630 jpeg", jpeg?.width === 1200 && jpeg?.height === 630 && jpeg?.mime === "image/jpeg", jpeg);
  const eva = measureImageBuffer(read("media/cases/eva-web.webp"));
  expect("eva cover measured as 1536x1024 webp", eva?.width === 1536 && eva?.height === 1024 && eva?.mime === "image/webp", eva);
  const poster = measureImageBuffer(read("media/cases/nastya-portrait-retouch/og-poster.jpg"));
  expect("portrait cover measured as 800x1200 jpeg", poster?.width === 800 && poster?.height === 1200 && poster?.mime === "image/jpeg", poster);
}

// 10. Declared properties matching the real file pass.
{
  const actual = { width: 1536, height: 1024, mime: "image/webp" };
  const checks = checkOgImage({ url: "https://x/media/eva.webp", width: 1536, height: 1024, type: "image/webp" }, actual);
  expect("matching og:image properties pass", checks.every((c) => c.ok), checks);
}

// 11. The bug this check was added for: 1200x630 / image/jpeg declared for a
//     1536x1024 WebP must fail on width, height AND type.
{
  const actual = { width: 1536, height: 1024, mime: "image/webp" };
  const checks = checkOgImage({ url: "https://x/media/eva.webp", width: 1200, height: 630, type: "image/jpeg" }, actual);
  const byName = Object.fromEntries(checks.map((c) => [c.name, c]));
  expect("wrong width fails", byName["og-image-width"]?.ok === false, byName["og-image-width"]);
  expect("wrong height fails", byName["og-image-height"]?.ok === false, byName["og-image-height"]);
  expect("wrong MIME type fails", byName["og-image-type"]?.ok === false, byName["og-image-type"]);
}

// 12. Omitting the optional properties is valid; declaring only some is not.
{
  const omitted = checkOgImage({ url: "https://x/og.jpg" }, { width: 1200, height: 630, mime: "image/jpeg" });
  expect("omitted width/height/type is allowed", omitted.every((c) => c.ok), omitted);
  const partial = checkOgImage({ url: "https://x/og.jpg", width: 1200 }, { width: 1200, height: 630, mime: "image/jpeg" });
  expect("partial og:image properties fail", partial.some((c) => c.ok === false), partial);
  const absent = checkOgImage({ url: null }, null);
  expect("missing og:image fails", absent.every((c) => c.ok === false), absent);
  const remote = checkOgImage({ url: "https://cdn.example/og.jpg", width: 800, height: 600, type: "image/jpeg" }, null);
  expect("remote image: completeness checked only", remote.every((c) => c.ok), remote);
}

console.log(`\ncontrol checks: ${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
