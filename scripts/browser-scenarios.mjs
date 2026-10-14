// Package 3 browser scenarios — the checks the URL checker cannot do (real
// scrolling, a fixed header, Lenis, back/forward, mobile).
//
//   node scripts/browser-scenarios.mjs --base http://localhost:3011 [--engine chromium|webkit|both] [--mode full|smoke]
//
// Engines: Playwright Chromium and Playwright WebKit. WebKit here is the
// Playwright build, NOT the installed Safari browser — that is a separate,
// optional check. Emulates: desktop, mobile, and desktop with
// prefers-reduced-motion.
//
// Every transition is exercised on ALL SIX direction pages
// (/services/{it,design,video} and their /en counterparts):
//   direct open · reload · in-page hero button · home button ·
//   old-category redirect · back/forward.
import { chromium, webkit } from "playwright";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const BASE = arg("--base", "http://localhost:3011").replace(/\/$/, "");
const ENGINE_ARG = arg("--engine", "both");
const MODE = arg("--mode", "full");

const ENGINES = [
  ["chromium", chromium],
  ["webkit", webkit],
].filter(([n]) => ENGINE_ARG === "both" || ENGINE_ARG === n);

/** All six direction pages: [path suffix, direction, language prefix]. */
const SIX = [
  ["/services/it", "it", ""],
  ["/services/design", "design", ""],
  ["/services/video", "video", ""],
  ["/en/services/it", "it", "/en"],
  ["/en/services/design", "design", "/en"],
  ["/en/services/video", "video", "/en"],
];

const CASE_COUNT = { it: 21, design: 24, video: 55 };

const results = [];
let failures = 0;

function record(scope, name, ok, detail = "") {
  results.push({ scope, name, ok, detail });
  if (!ok) failures += 1;
  console.log(`${ok ? "  ✓" : "  ✗"} [${scope}] ${name}${detail ? ` — ${detail}` : ""}`);
}

/** Wait for hydration + the anchor re-alignment. `networkidle` is unusable:
 *  the video cards keep streaming media. */
async function settle(page, ms = 2000) {
  await page.waitForLoadState("domcontentloaded");
  await page
    .waitForFunction(() => document.readyState === "complete", null, { timeout: 20000 })
    .catch(() => {});
  await page.waitForTimeout(ms);
}

/**
 * `#cases` must be scrolled into view AND its heading must sit below the
 * fixed header (the header must not cover it).
 */
function anchorProbe() {
  const section = document.getElementById("cases");
  if (!section) return { ok: false, reason: "no #cases" };
  const heading = section.querySelector("h2");
  if (!heading) return { ok: false, reason: "no #cases h2" };
  const header = document.querySelector("header");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
  const headingTop = heading.getBoundingClientRect().top;
  const scrollY = window.scrollY;
  return {
    ok: scrollY > 10 && headingTop >= headerBottom - 1 && headingTop < window.innerHeight,
    scrollY: Math.round(scrollY),
    headerBottom: Math.round(headerBottom),
    headingTop: Math.round(headingTop),
  };
}

async function openMenuIfBurger(page) {
  const burger = page.locator('header button[aria-label="Toggle menu"]');
  if ((await burger.count()) === 0) return;
  if (await burger.first().isVisible().catch(() => false)) {
    await burger.first().click();
    await page.waitForTimeout(400);
  }
}

async function clickContacts(page) {
  await openMenuIfBurger(page);
  const btn = page.locator("header button").filter({ hasText: /^(Контакти|Contacts)$/ }).first();
  if ((await btn.count()) === 0) return false;
  await btn.click({ force: true }).catch(async () => {
    await page.evaluate(() => {
      const b = [...document.querySelectorAll("header button")].find((x) =>
        /^(Контакти|Contacts)$/.test((x.textContent || "").trim()),
      );
      b?.click();
    });
  });
  return true;
}

async function contactsProbe(page) {
  return page.evaluate(() => {
    const el = document.getElementById("contacts");
    if (!el) return { ok: false, reason: "no #contacts" };
    const r = el.getBoundingClientRect();
    const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
    return { ok: window.scrollY > 10 && r.top >= headerBottom - 1, top: Math.round(r.top) };
  });
}

async function runEngine(browserType, engineName, contextOptions, scopeSuffix) {
  const scope0 = `${engineName}${scopeSuffix}`;
  const browser = await browserType.launch();
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  let pageErrors = 0;
  page.on("pageerror", () => (pageErrors += 1));

  /* 1 — direct open with #cases, all six pages */
  for (const [path] of SIX) {
    await page.goto(`${BASE}${path}#cases`, { waitUntil: "domcontentloaded" });
    await settle(page);
    const probe = await page.evaluate(anchorProbe);
    record(scope0, `direct open ${path}#cases`, probe.ok, JSON.stringify(probe));
  }

  /* 2 — reload keeps the anchor, all six pages */
  for (const [path] of SIX) {
    await page.goto(`${BASE}${path}#cases`, { waitUntil: "domcontentloaded" });
    await settle(page, 1200);
    await page.reload({ waitUntil: "domcontentloaded" });
    await settle(page);
    record(scope0, `reload keeps ${path}#cases`, (await page.evaluate(anchorProbe)).ok);
  }

  /* 3 — the in-page hero button, all six pages */
  for (const [path] of SIX) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await settle(page, 1200);
    const btn = page.locator('a[href="#cases"]').first();
    if ((await btn.count()) === 0) {
      record(scope0, `hero has «Переглянути роботи» on ${path}`, false);
      continue;
    }
    await btn.click();
    await settle(page);
    record(scope0, `hero button → #cases on ${path}`, (await page.evaluate(anchorProbe)).ok);
  }

  /* 4 — home "Всі … кейси" buttons (UA home and EN home) */
  for (const [home, expected, label] of [
    ["/", "/services/it#cases", "UA IT"],
    ["/", "/services/design#cases", "UA Дизайн"],
    ["/", "/services/video#cases", "UA Відео"],
    ["/en", "/en/services/it#cases", "EN IT"],
    ["/en", "/en/services/design#cases", "EN Дизайн"],
    ["/en", "/en/services/video#cases", "EN Відео"],
  ]) {
    await page.goto(`${BASE}${home}`, { waitUntil: "domcontentloaded" });
    await settle(page, 1200);
    const link = page.locator(`a[href="${expected}"]`).first();
    if ((await link.count()) === 0) {
      record(scope0, `home ${home} has «${label}» link`, false, `no a[href="${expected}"]`);
      continue;
    }
    await link.click();
    await page.waitForURL(`**${expected}`);
    await settle(page);
    record(scope0, `home «${label}» → ${expected}`, (await page.evaluate(anchorProbe)).ok);
  }

  /* 5 — old category URLs redirect and keep #cases (all six) */
  for (const [from, to] of [
    ["/cases/it", "/services/it#cases"],
    ["/cases/design", "/services/design#cases"],
    ["/cases/video", "/services/video#cases"],
    ["/en/cases/it", "/en/services/it#cases"],
    ["/en/cases/design", "/en/services/design#cases"],
    ["/en/cases/video", "/en/services/video#cases"],
  ]) {
    await page.goto(`${BASE}${from}`, { waitUntil: "domcontentloaded" });
    await settle(page);
    const url = page.url();
    const probe = await page.evaluate(anchorProbe);
    record(scope0, `redirect ${from}`, url === `${BASE}${to}` && probe.ok, `url=${url} ${JSON.stringify(probe)}`);
  }

  /* 6 — back / forward, all six pages */
  for (const [path] of SIX) {
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
    await settle(page, 1000);
    await page.goto(`${BASE}${path}#cases`, { waitUntil: "domcontentloaded" });
    await settle(page, 1500);
    await page.goBack();
    await page.waitForURL(`${BASE}/`);
    await page.waitForTimeout(600);
    await page.goForward();
    await page.waitForURL(`**${path}#cases`);
    await settle(page);
    record(scope0, `back/forward returns to ${path}#cases`, (await page.evaluate(anchorProbe)).ok);
  }

  /* 7 — contacts nav: home scrolls to the footer, subpage navigates home */
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await settle(page, 1200);
  if (await clickContacts(page)) {
    await page.waitForTimeout(1500);
    const c = await contactsProbe(page);
    record(scope0, "home nav «Контакти» → #contacts", c.ok, JSON.stringify(c));
  } else {
    record(scope0, "home nav «Контакти» present", false);
  }

  await page.goto(`${BASE}/services/it`, { waitUntil: "domcontentloaded" });
  await settle(page, 1200);
  if (await clickContacts(page)) {
    await page.waitForURL(`${BASE}/#contacts`, { timeout: 8000 }).catch(() => {});
    await settle(page, 1500);
    const c = await contactsProbe(page);
    record(scope0, "subpage nav «Контакти» → /#contacts", page.url().includes("/#contacts") && c.ok, `${page.url()} ${JSON.stringify(c)}`);
  } else {
    record(scope0, "subpage nav «Контакти» present", false);
  }

  /* 8 — list semantics on all six pages: no non-li child directly under ul */
  for (const [path] of SIX) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await settle(page, 1000);
    const bad = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll("ul").forEach((ul, i) => {
        [...ul.children].forEach((c) => {
          if (c.tagName !== "LI") out.push(`ul[${i}] > ${c.tagName}`);
        });
      });
      return out;
    });
    record(scope0, `${path} lists are ul>li only`, bad.length === 0, bad.join(", "));
  }

  /* 9 — no raw i18n keys visible on all six pages */
  for (const [path] of SIX) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await settle(page, 1000);
    const raw = await page.evaluate(() => {
      const clone = document.body.cloneNode(true);
      clone.querySelectorAll("script,style").forEach((n) => n.remove());
      const text = clone.textContent || "";
      const m = text.match(
        /\b(?:videoCases|itCases|designCases|services|direction|cases|meta)\.[A-Za-z0-9_]+\.[A-Za-z0-9_]+/g,
      );
      return m ? [...new Set(m)] : [];
    });
    record(scope0, `no raw i18n keys on ${path}`, raw.length === 0, raw.join(", "));
  }

  /* 10 — case counts per direction (UA and EN) */
  for (const [path, dir] of SIX) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await settle(page, 1200);
    const n = await page.evaluate((d) => {
      const section = document.getElementById("cases");
      if (!section) return -1;
      const hrefs = [...section.querySelectorAll("a")].map((a) => a.getAttribute("href") || "");
      return new Set(hrefs.filter((h) => new RegExp(`^/(en/)?cases/${d}/`).test(h))).size;
    }, dir);
    record(scope0, `${path} lists ${CASE_COUNT[dir]} cases`, n === CASE_COUNT[dir], `found ${n}`);
  }

  record(scope0, "no uncaught page errors", pageErrors === 0, `${pageErrors} errors`);

  await browser.close();
}

const desktop = { viewport: { width: 1440, height: 900 } };
const mobile = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
const reduced = { ...desktop, reducedMotion: "reduce" };

for (const [engineName, engine] of ENGINES) {
  await runEngine(engine, engineName, desktop, " desktop");
  await runEngine(engine, engineName, mobile, " mobile");
  if (MODE === "full") {
    await runEngine(engine, engineName, reduced, " reduced-motion");
  }
}

console.log(`\n${results.length} checks, ${failures} failed`);
if (failures.length || failures > 0) {
  const bad = results.filter((r) => !r.ok);
  if (bad.length) {
    console.log("\nFailures:");
    for (const f of bad) console.log(`  - [${f.scope}] ${f.name}${f.detail ? ` :: ${f.detail}` : ""}`);
  }
}
process.exit(failures ? 1 : 0);
