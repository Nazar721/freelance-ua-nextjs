// Package 3 — anchor-loop behaviour checks that the URL checker cannot do.
//
//   node scripts/package3-anchor-check.mjs --base http://localhost:3011
//
// Runs on Playwright Chromium and Playwright WebKit (the Playwright builds,
// NOT the installed Safari browser).
//
// The properties under test:
//   1. Deep link converges — `#cases` ends up just below the fixed header.
//   2. The loop DETACHES once settled. Proven behaviourally: after settling,
//      a spacer is injected above the anchor to move it. A detached loop
//      leaves the scroll where it was; a leaked one snaps it again. (Counting
//      rAF callbacks cannot prove this — Lenis keeps its own gsap ticker
//      running forever, ~60 Hz, on every page.)
//   3. The user can interrupt an in-flight automatic scroll; their own
//      position then wins and stays put.
//   4. No leaked loop after a soft (client-side) navigation away from a
//      `#hash` page. The home page also has `id="cases"`, so a leaked loop
//      would visibly park it there instead of at the top.
//   5. The scroll position is not fought after navigation.
import { chromium, webkit } from "playwright";

const args = process.argv.slice(2);
const BASE = (args[args.indexOf("--base") + 1] || "http://localhost:3011").replace(/\/$/, "");

let pass = 0;
let fail = 0;
const failures = [];

function rec(name, ok, detail = "") {
  if (ok) pass += 1;
  else {
    fail += 1;
    failures.push(`${name}${detail ? ` :: ${detail}` : ""}`);
  }
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`);
}

async function settle(page, ms = 2500) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(ms);
}

/** Instrument every scroll entry point the anchor code can use, then shift
 *  the layout and report how many scroll calls happened as a result. */
async function countScrollCallsAfterLayoutShift(page) {
  await page.evaluate(() => {
    window.__scrollCalls = 0;
    const orig = window.scrollTo.bind(window);
    window.scrollTo = (...a) => {
      window.__scrollCalls += 1;
      return orig(...a);
    };
    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      const ls = lenis.scrollTo.bind(lenis);
      lenis.scrollTo = (...a) => {
        window.__scrollCalls += 1;
        return ls(...a);
      };
    }
    // Move the anchor: insert a tall spacer directly above the #cases section.
    const el = document.getElementById("cases");
    if (el && el.parentElement) {
      const spacer = document.createElement("div");
      spacer.id = "__anchor-shift-spacer";
      spacer.style.height = "400px";
      el.parentElement.insertBefore(spacer, el);
    }
  });
  await page.waitForTimeout(1200);
  return page.evaluate(() => {
    const spacer = document.getElementById("__anchor-shift-spacer");
    spacer?.remove();
    return window.__scrollCalls || 0;
  });
}

async function run(browserType, engineName) {
  const browser = await browserType.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log(`\n── ${engineName} desktop ──`);

  /* 1 ── deep link converges with the heading below the fixed header */
  for (const path of ["/services/it#cases", "/en/services/video#cases", "/services/design#cases"]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await settle(page, 3000);
    const m = await page.evaluate(() => {
      const section = document.getElementById("cases");
      const heading = section?.querySelector("h2");
      const header = document.querySelector("header");
      if (!section || !heading || !header) return { ok: false, reason: "missing node" };
      const hb = header.getBoundingClientRect().bottom;
      const ht = heading.getBoundingClientRect().top;
      return { ok: window.scrollY > 10 && ht >= hb - 1 && ht < window.innerHeight, scrollY: Math.round(window.scrollY), headingTop: Math.round(ht), headerBottom: Math.round(hb) };
    });
    rec(`${engineName} deep link ${path}`, m.ok, JSON.stringify(m));
  }

  /* 2 ── the loop DETACHES: a layout shift after settling is NOT corrected */
  await page.goto(`${BASE}/services/it#cases`, { waitUntil: "domcontentloaded" });
  await settle(page, 3500);
  const calls = await countScrollCallsAfterLayoutShift(page);
  rec(`${engineName} loop detaches after settling`, calls === 0, `scroll calls after a 400px layout shift: ${calls}`);

  /* 2b ── control: while the loop is still live (right after the jump) the
     same shift IS corrected. Proves the instrumentation can see the loop. */
  await page.goto(`${BASE}/services/design#cases`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(120); // jump applied, loop still converging
  const liveCalls = await countScrollCallsAfterLayoutShift(page);
  rec(`${engineName} instrumentation can observe a live loop`, liveCalls > 0, `scroll calls while settling: ${liveCalls}`);

  /* 3 ── interruption: wheel mid-flight. The user's own position must win. */
  await page.goto(`${BASE}/services/video`, { waitUntil: "domcontentloaded" });
  await settle(page, 2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('a[href="#cases"]').first().click();
  await page.waitForTimeout(120); // animation in flight
  await page.mouse.wheel(0, -8000); // yank back to the top
  await page.waitForTimeout(2500); // let any runaway animation finish
  const y1 = await page.evaluate(() => Math.round(window.scrollY));
  rec(`${engineName} wheel interrupts the automatic scroll`, y1 < 500, `scrollY=${y1}`);

  /* 3b ── interruption via touchstart, same expectation */
  await page.goto(`${BASE}/services/design`, { waitUntil: "domcontentloaded" });
  await settle(page, 2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('a[href="#cases"]').first().click();
  await page.waitForTimeout(120);
  await page.evaluate(() => window.dispatchEvent(new Event("touchstart", { bubbles: true })));
  await page.mouse.wheel(0, -8000);
  await page.waitForTimeout(2500);
  const y2 = await page.evaluate(() => Math.round(window.scrollY));
  rec(`${engineName} touchstart + wheel interrupts`, y2 < 500, `scrollY=${y2}`);

  /* 4 ── no leaked loop after soft navigation away from a #hash page.
     The home page has its own id="cases", so a leaked loop would park us
     there instead of at the top. */
  await page.goto(`${BASE}/services/design#cases`, { waitUntil: "domcontentloaded" });
  await settle(page, 3000);
  const atAnchor = await page.evaluate(() => Math.round(window.scrollY));
  rec(`${engineName} settled on the anchor first`, atAnchor > 500, `scrollY=${atAnchor}`);

  await page.locator('header a[href="/"]').first().click();
  await page.waitForURL(`${BASE}/`);
  await page.waitForTimeout(2500);
  const yHome = await page.evaluate(() => Math.round(window.scrollY));
  rec(`${engineName} no leaked loop after leaving a #hash page`, yHome < 400, `home scrollY=${yHome}`);

  /* 5 ── the position is not fought afterwards */
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(1500);
  const yHeld = await page.evaluate(() => Math.round(window.scrollY));
  rec(`${engineName} scroll position is not fought after navigation`, Math.abs(yHeld - 300) < 60, `scrollY=${yHeld}`);

  await browser.close();
}

/* Mobile: the Lenis path is disabled there, so the native branch of
   applyScrollTop is exercised — the branch where the original bug lived. */
async function runMobile(browserType, engineName) {
  const browser = await browserType.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  console.log(`\n── ${engineName} mobile ──`);

  for (const path of ["/services/it#cases", "/en/services/video#cases", "/services/design#cases", "/services/video#cases"]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await settle(page, 3000);
    const m = await page.evaluate(() => {
      const section = document.getElementById("cases");
      const heading = section?.querySelector("h2");
      const header = document.querySelector("header");
      if (!section || !heading || !header) return { ok: false, reason: "missing node" };
      const hb = header.getBoundingClientRect().bottom;
      const ht = heading.getBoundingClientRect().top;
      return { ok: window.scrollY > 10 && ht >= hb - 1 && ht < window.innerHeight, scrollY: Math.round(window.scrollY), headingTop: Math.round(ht), headerBottom: Math.round(hb) };
    });
    rec(`${engineName} mobile deep link ${path}`, m.ok, JSON.stringify(m));
  }

  await page.goto(`${BASE}/services/it#cases`, { waitUntil: "domcontentloaded" });
  await settle(page, 3500);
  const calls = await countScrollCallsAfterLayoutShift(page);
  rec(`${engineName} mobile loop detaches after settling`, calls === 0, `scroll calls after a 400px shift: ${calls}`);

  await browser.close();
}

for (const [name, engine] of [
  ["chromium", chromium],
  ["webkit", webkit],
]) {
  await run(engine, name);
  await runMobile(engine, name);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (failures.length) {
  console.log("\nFailures:");
  for (const f of failures) console.log(`  - ${f}`);
}
process.exit(fail ? 1 : 0);
