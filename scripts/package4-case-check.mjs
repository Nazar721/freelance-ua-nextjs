// Package 4 browser checks — the three reworked case pages in both languages.
//
//   node scripts/package4-case-check.mjs --base http://localhost:3011 [--engine chromium|webkit|both]
//
// Covers what the URL checker cannot: the visible breadcrumb and its links,
// the language switcher (including "a URL keeps its language after the
// NEXT_LOCALE cookie has been set to the other one"), galleries, the
// fullscreen video player, related-work links, back/forward, the mobile
// viewport and prefers-reduced-motion.
//
// Engine note: Chromium and WebKit here are Playwright builds, not the
// installed Chrome/Safari browsers.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { registerHooks } from "node:module";
import { chromium, webkit } from "playwright";

// Extensionless relative imports in the app (bundler resolution) — same hook
// scripts/inventory.mjs uses, so this script reads the very same records.
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
const BASE = arg("--base", "http://localhost:3011").replace(/\/$/, "");
const ENGINE_ARG = arg("--engine", "both");
const OUT = arg("--out", path.join(process.cwd(), "docs", "package-4", "browser-report.txt"));

const registry = await import(pathToFileURL(path.join(process.cwd(), "data/case-records/index.ts")).href);
const { translations } = await import(pathToFileURL(path.join(process.cwd(), "lib/i18n.ts")).href);
const { resolveText } = await import(pathToFileURL(path.join(process.cwd(), "data/case-records/types.ts")).href);
// Optional `--id direction/slug` filter: run the suite for a subset (used to
// re-check exactly the cases a review flagged).
const idFilters = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--id" && args[i + 1]) idFilters.push(args[i + 1]);
}
const records = idFilters.length
  ? registry.caseRecords.filter((r) => idFilters.includes(r.id))
  : registry.caseRecords;
if (idFilters.length && records.length !== idFilters.length) {
  const missing = idFilters.filter((id) => !records.some((r) => r.id === id));
  console.error(`unknown case id(s): ${missing.join(", ")}`);
  process.exit(2);
}
if (idFilters.length) console.log(`selected ${records.length} case(s): ${records.map((r) => r.id).join(", ")}`);

const ENGINES = [
  ["chromium", chromium],
  ["webkit", webkit],
].filter(([name]) => ENGINE_ARG === "both" || ENGINE_ARG === name);

const results = [];
let failures = 0;
const t0 = Date.now();

function check(scope, name, ok, detail = "") {
  results.push({ scope, name, ok, detail });
  if (!ok) failures += 1;
  console.log(`${ok ? "  ✓" : "  ✗"} [${scope}] ${name}${detail ? ` — ${detail}` : ""}`);
}

async function settle(page, ms = 700) {
  await page.waitForLoadState("domcontentloaded");
  await page
    .waitForFunction(() => document.readyState === "complete", null, { timeout: 15000 })
    .catch(() => {});
  await page.waitForTimeout(ms);
}

function visibleTextProbe() {
  const html = document.documentElement.outerHTML;
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  const keys = [...new Set(visible.match(/\b(?:itCases|designCases|videoCases|nav|hero|services|cases|partners|footer|process|pricing|testimonial|why|contact|trusted|partnership|header)\.[A-Za-z0-9_.]+/g) || [])];
  return {
    lang: document.documentElement.lang,
    h1s: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
    rawKeys: keys,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
    hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => ({
      lang: l.getAttribute("hreflang"),
      href: l.getAttribute("href"),
    })),
    lead: document.querySelector("article p.text-muted-foreground")?.textContent.trim() ?? null,
  };
}

function breadcrumbProbe() {
  const nav = [...document.querySelectorAll("nav[aria-label]")].find((n) =>
    ["Навігаційний ланцюжок", "Breadcrumb"].includes(n.getAttribute("aria-label")),
  );
  if (!nav) return null;
  const label = nav.getAttribute("aria-label");
  const items = [...nav.querySelectorAll("ol > li")].map((li) => {
    const link = li.querySelector("a");
    const current = li.querySelector('[aria-current="page"]');
    return { label: (link ?? current)?.textContent.trim() ?? "", href: link?.getAttribute("href") ?? null };
  });
  const separators = [...nav.querySelectorAll("ol li span[aria-hidden]")].map((s) => s.textContent.trim());
  return { label, items, separators };
}

function relatedProbe() {
  const heading = [...document.querySelectorAll("h2")].find((h) =>
    ["Інші проєкти", "Other projects"].includes(h.textContent.trim()),
  );
  if (!heading) return null;
  const section = heading.closest("section");
  const links = [...section.querySelectorAll("a")].map((a) => a.getAttribute("href"));
  return { heading: heading.textContent.trim(), links };
}

/**
 * A page bound to one context, with explicit isolation rules.
 *
 * A WebKit navigation that times out leaves the page with a still-pending
 * document; the next `page.goto` on that same page is then rejected with
 * "interrupted by another navigation" and the *next* case is failed for a
 * problem that is not its own. Two mitigations, neither of which weakens a
 * single assertion:
 *   - the page is recycled between cases, so no case inherits another's
 *     half-loaded document or accumulated renderer state;
 *   - any thrown check recycles the page immediately, so the failure is
 *     attributed to the case that produced it and the next one starts clean.
 */
function suite(context, scope) {
  let page = null;
  const api = {
    async recycle() {
      if (page && !page.isClosed()) await page.close().catch(() => {});
      page = null;
    },
    async run(name, fn) {
      if (!page || page.isClosed()) page = await context.newPage();
      try {
        await fn(page);
      } catch (err) {
        check(scope, name, false, String(err.message || err).split("\n")[0]);
        await api.recycle();
      }
    },
  };
  return api;
}

async function checkCasePage(page, record, locale, scope) {
  const path_ = locale === "en" ? record.enPath : record.uaPath;
  const dict = translations[locale];
  const h1Expected = resolveText(record.h1, locale, dict);
  // The hero paragraph is the subtitle when the record has one (EVA), the
  // lead otherwise — a record must show exactly one of them.
  const leadSource = record.subtitle ?? record.lead;
  const leadExpected = leadSource ? resolveText(leadSource, locale, dict) : null;
  const homeLabel = dict["cases.breadcrumb.home"];
  const directionLabel = dict[`services.${record.direction}.category`];

  const response = await page.goto(`${BASE}${path_}`, { waitUntil: "domcontentloaded" });
  await settle(page);
  check(scope, `${path_} status 200`, response?.status() === 200, String(response?.status()));

  const probe = await page.evaluate(visibleTextProbe);
  check(scope, `${path_} html lang`, probe.lang === locale, probe.lang);
  check(scope, `${path_} exactly one h1`, probe.h1s.length === 1, JSON.stringify(probe.h1s));
  check(scope, `${path_} h1 localized`, probe.h1s[0] === h1Expected, `actual="${probe.h1s[0]}" expected="${h1Expected}"`);
  if (leadExpected !== null) {
    check(scope, `${path_} hero text localized`, probe.lead === leadExpected, String(probe.lead).slice(0, 60));
  } else {
    check(scope, `${path_} hero has subtitle or lead`, probe.lead !== null, String(probe.lead));
  }
  if (record.subtitle && record.lead) {
    check(scope, `${path_} subtitle and lead both present`, true);
  }
  check(scope, `${path_} single canonical`, probe.canonicalCount === 1, String(probe.canonicalCount));
  check(
    scope,
    `${path_} canonical path`,
    probe.canonical === `${"https://freelance-ua.agency"}${path_}`,
    probe.canonical,
  );
  const expectedAlternate = locale === "en" ? record.uaPath : record.enPath;
  const otherLang = locale === "en" ? "uk" : "en";
  const alternate = probe.hreflang.find((h) => h.lang === otherLang);
  check(
    scope,
    `${path_} hreflang ${otherLang}`,
    !!alternate && alternate.href === `https://freelance-ua.agency${expectedAlternate}`,
    alternate?.href,
  );
  check(scope, `${path_} no raw i18n keys`, probe.rawKeys.length === 0, JSON.stringify(probe.rawKeys));

  const crumb = await page.evaluate(breadcrumbProbe);
  check(scope, `${path_} breadcrumb present`, !!crumb, crumb ? "" : "no breadcrumb nav");
  if (crumb) {
    check(scope, `${path_} breadcrumb aria-label`, crumb.label === dict["cases.breadcrumb.label"], crumb.label);
    check(scope, `${path_} breadcrumb has 3 items`, crumb.items.length === 3, JSON.stringify(crumb.items.map((i) => i.label)));
    check(scope, `${path_} breadcrumb home label`, crumb.items[0]?.label === homeLabel, crumb.items[0]?.label);
    check(
      scope,
      `${path_} breadcrumb home href`,
      crumb.items[0]?.href === (locale === "en" ? "/en" : "/"),
      crumb.items[0]?.href,
    );
    check(scope, `${path_} breadcrumb direction label`, crumb.items[1]?.label === directionLabel, crumb.items[1]?.label);
    check(
      scope,
      `${path_} breadcrumb direction href`,
      crumb.items[1]?.href === `${locale === "en" ? "/en" : ""}/services/${record.direction}`,
      crumb.items[1]?.href,
    );
    check(scope, `${path_} breadcrumb current is H1`, crumb.items[2]?.label === h1Expected, crumb.items[2]?.label);
    check(scope, `${path_} breadcrumb current has no href`, crumb.items[2]?.href === null, String(crumb.items[2]?.href));
    check(
      scope,
      `${path_} breadcrumb separators hidden`,
      crumb.separators.length === 2 && crumb.separators.every((s) => s === "→"),
      JSON.stringify(crumb.separators),
    );
  }

  // Back-to-list link keeps the original target (with its filter fragment).
  const backHref = record.backToList ? record.backToList.href[locale] : null;
  if (backHref) {
    const found = await page.evaluate(
      ([href]) => [...document.querySelectorAll("a")].some((a) => a.getAttribute("href") === href),
      [backHref],
    );
    check(scope, `${path_} back-to-list link`, found, backHref);
  }

  // Language switcher points at the counterpart, never at the home page.
  const switcherHref = await page.evaluate(() => {
    const groups = [...document.querySelectorAll('div[role="group"]')];
    const group = groups.find((g) => g.querySelector('a[aria-pressed="false"], span[aria-disabled="true"]'));
    const link = group?.querySelector('a[aria-pressed="false"]');
    return link ? link.getAttribute("href") : null;
  });
  check(
    scope,
    `${path_} switcher → counterpart`,
    switcherHref === expectedAlternate,
    `${switcherHref} (expected ${expectedAlternate})`,
  );

  // Similar work: three cards, none of them the case itself.
  const related = await page.evaluate(relatedProbe);
  check(scope, `${path_} related heading`, !!related?.heading, related?.heading ?? "missing");
  check(scope, `${path_} related has 3 cards`, (related?.links ?? []).length === 3, JSON.stringify(related?.links));
  check(
    scope,
    `${path_} related excludes current`,
    !(related?.links ?? []).includes(path_),
    JSON.stringify(related?.links),
  );
}

async function checkLanguageSwitch(page, record, scope) {
  // Start on the UA page, follow the switcher to EN, then prove the UA URL
  // still renders Ukrainian even though NEXT_LOCALE=en is now set.
  await page.goto(`${BASE}${record.uaPath}`, { waitUntil: "domcontentloaded" });
  await settle(page, 400);
  await page.evaluate(() => {
    const groups = [...document.querySelectorAll('div[role="group"]')];
    const group = groups.find((g) => g.querySelector('a[aria-pressed="false"]'));
    group?.querySelector('a[aria-pressed="false"]')?.click();
  });
  await page.waitForURL(`**${record.enPath}`, { timeout: 15000 }).catch(() => {});
  await settle(page, 600);
  const afterSwitch = await page.evaluate(() => ({
    url: location.pathname,
    lang: document.documentElement.lang,
    h1: document.querySelector("h1")?.textContent.trim(),
  }));
  check(scope, `${record.uaPath} switch → EN url`, afterSwitch.url === record.enPath, afterSwitch.url);
  check(scope, `${record.uaPath} switch → EN lang`, afterSwitch.lang === "en", afterSwitch.lang);

  await page.goto(`${BASE}${record.uaPath}`, { waitUntil: "domcontentloaded" });
  await settle(page, 500);
  const cookieLang = await page.evaluate(() => document.cookie);
  const backOnUa = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    h1: document.querySelector("h1")?.textContent.trim(),
  }));
  check(scope, `${record.uaPath} stays uk with NEXT_LOCALE=en`, backOnUa.lang === "uk", `${backOnUa.lang} (${cookieLang})`);
  check(
    scope,
    `${record.uaPath} UA h1 with NEXT_LOCALE=en`,
    backOnUa.h1 === resolveText(record.h1, "uk", translations.uk),
    backOnUa.h1,
  );
}

async function checkBackForward(page, record, scope) {
  await page.goto(`${BASE}${record.uaPath}`, { waitUntil: "domcontentloaded" });
  await settle(page, 500);
  await page.evaluate(() => {
    const nav = [...document.querySelectorAll("nav[aria-label]")].find((n) =>
      ["Навігаційний ланцюжок", "Breadcrumb"].includes(n.getAttribute("aria-label")),
    );
    nav?.querySelector("a")?.click();
  });
  await page.waitForURL(`${BASE}/`, { timeout: 15000 }).catch(() => {});
  await settle(page, 600);
  check(scope, `${record.uaPath} breadcrumb → home`, page.url() === `${BASE}/`, page.url());

  await page.goBack();
  await settle(page, 700);
  const afterBack = await page.evaluate(() => ({
    path: location.pathname,
    h1: document.querySelector("h1")?.textContent.trim(),
  }));
  check(scope, `${record.uaPath} back → case`, afterBack.path === record.uaPath, afterBack.path);
  check(
    scope,
    `${record.uaPath} back keeps H1`,
    afterBack.h1 === resolveText(record.h1, "uk", translations.uk),
    `actual="${afterBack.h1}" expected="${resolveText(record.h1, "uk", translations.uk)}"`,
  );

  await page.goForward();
  await settle(page, 700);
  check(scope, `${record.uaPath} forward → home`, page.url() === `${BASE}/`, page.url());
}

async function checkImageModal(page, record, scope) {
  const openLabel = translations.uk["cases.ui.openImage"];
  const closeButton = translations.uk["cases.ui.close"];
  await page.goto(`${BASE}${record.uaPath}`, { waitUntil: "domcontentloaded" });
  await settle(page, 1200);

  const openerButtons = page.locator(`button[aria-label="${openLabel}"]:visible`);
  const opener = openerButtons.first();
  const openerCount = await openerButtons.count();
  if (openerCount === 0) {
    check(scope, `${record.uaPath} has expandable images`, false, "no gallery button");
    return;
  }
  const dialog = page.locator('[role="dialog"]');
  await opener.click();
  await page.waitForTimeout(600);
  if ((await dialog.count()) === 0) {
    // WebKit can answer the first click before the client has hydrated; the
    // opener is still there, so one retry is safe and self-limiting.
    await page.waitForTimeout(1200);
    await opener.click();
    await page.waitForTimeout(600);
  }
  check(scope, `${record.uaPath} image modal opens`, (await dialog.count()) === 1, String(await dialog.count()));
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  check(scope, `${record.uaPath} image modal closes on Escape`, (await dialog.count()) === 0);

  // Reopen and close with the localized close button.
  await opener.click();
  await page.waitForTimeout(400);
  await page.locator(`[role="dialog"] button[aria-label="${closeButton}"]`).first().click();
  await page.waitForTimeout(400);
  check(scope, `${record.uaPath} image modal closes on button`, (await dialog.count()) === 0);
}

function videoTileExpectation(record) {
  let count = 0;
  if (record.hero.kind === "videoGrid") count += record.hero.items.length;
  if (record.hero.kind === "video") count += 1;
  for (const section of record.sections) {
    if (section.kind === "videoGrid") count += section.items.length;
  }
  return count;
}

/** Scene sections that carry mobile-only detail crops. */
function sceneSections(record) {
  return record.sections.filter((section) => section.kind === "scenes" && section.items.some((i) => i.details?.length));
}

/**
 * Composite "scenes" block (moto-school storefront):
 *  - desktop: one card per stage, each with its full image; the detail crops
 *    are hidden;
 *  - mobile: the same cards, and under a card that has details the crop
 *    figures are visible, each showing the scene file framed on its zone;
 *  - clicking a scene image opens the shared lightbox with that file.
 */
async function checkScenes(page, record, scope, viewport) {
  const sections = sceneSections(record);
  if (!sections.length) return;
  const section = sections[0];
  const expectedCards = section.items.length;
  const expectedDetails = section.items.reduce((n, item) => n + (item.details?.length ?? 0), 0);
  const path_ = record.uaPath;
  await page.goto(`${BASE}${path_}`, { waitUntil: "domcontentloaded" });
  await settle(page, 1000);

  const probe = await page.evaluate(() => {
    const root = document.querySelector('[data-case-block="scenes"]');
    if (!root) return null;
    const cards = [...root.querySelectorAll('[data-case-block="scene"]')];
    const details = [...root.querySelectorAll('[data-case-block="scene-detail"]')];
    const visible = (el) => !!el.getClientRects().length;
    return {
      cards: cards.length,
      cardImages: cards.map((card) => {
        const img = card.querySelector('[data-case-block="scene-image"] img');
        return { src: img?.getAttribute("src") ?? "", visible: visible(card) };
      }),
      details: details.length,
      detailsVisible: details.map(visible),
      detailFiles: details.map((d) => d.querySelector("img")?.getAttribute("src") ?? ""),
      arrow: !!root.querySelector('[aria-hidden="true"] svg'),
    };
  });

  if (!probe) {
    check(scope, `${path_} ${viewport} scenes block present`, false);
    return;
  }
  check(scope, `${path_} ${viewport} scenes cards`, probe.cards === expectedCards, `${probe.cards}/${expectedCards}`);
  check(scope, `${path_} ${viewport} scenes images visible`, probe.cardImages.every((c) => c.visible));
  check(scope, `${path_} ${viewport} scenes detail crops`, probe.details === expectedDetails, `${probe.details}/${expectedDetails}`);
  if (viewport === "mobile") {
    check(scope, `${path_} mobile detail crops visible`, probe.detailsVisible.every(Boolean));
  } else {
    check(
      scope,
      `${path_} desktop detail crops hidden`,
      probe.details === 0 || probe.detailsVisible.every((v) => !v),
    );
  }
}

async function checkVideoModal(page, record, scope) {
  const expectedTiles = videoTileExpectation(record);
  for (const locale of ["uk", "en"]) {
    const path_ = locale === "en" ? record.enPath : record.uaPath;
    const openLabel = translations[locale]["cases.ui.openVideo"];
    const closeButton = translations[locale]["cases.ui.close"];
    const playerLabel = translations[locale]["cases.ui.player"];
    await page.goto(`${BASE}${path_}`, { waitUntil: "domcontentloaded" });
    await settle(page, 1200);

    const tiles = page.locator(`video[aria-label="${openLabel}"]`);
    const tileCount = await tiles.count();
    check(scope, `${path_} hero video tiles`, tileCount === expectedTiles, `${tileCount} (expected ${expectedTiles})`);
    if (tileCount === 0) continue;

    // A single hero video keeps the original badges over its thumb: the
    // duration is localized, the ratio is the same in both languages.
    if (record.hero.kind === "video") {
      const heroTile = tiles.first().locator("xpath=..");
      if (record.hero.duration) {
        const want = resolveText(record.hero.duration, locale, translations[locale]).trim();
        const durationBadges = await heroTile.locator("span").filter({ hasText: want }).count();
        check(scope, `${path_} hero duration badge localized`, durationBadges >= 1, `want "${want}"`);
      }
      if (record.hero.format) {
        const formatBadges = await heroTile.locator("span").filter({ hasText: record.hero.format }).count();
        check(scope, `${path_} hero format badge`, formatBadges >= 1, `want "${record.hero.format}"`);
      }
    }

    // Click the tile wrapper: the gradient overlay sits on top of the <video>,
    // and Playwright requires the hit target to be the located element itself
    // or one of its descendants.
    const tileButton = tiles.first().locator("xpath=..");
    const dialog = page.locator('[role="dialog"][aria-modal="true"]');
    await tileButton.click();
    await page.waitForTimeout(600);
    if ((await dialog.count()) === 0) {
      // Same hydration race as the gallery: one retry, then the failure is real.
      await page.waitForTimeout(1200);
      await tileButton.click();
      await page.waitForTimeout(600);
    }
    check(scope, `${path_} player opens as a dialog`, (await dialog.count()) === 1, String(await dialog.count()));
    const dialogLabel = await dialog.first().getAttribute("aria-label").catch(() => null);
    check(scope, `${path_} dialog name localized`, dialogLabel === playerLabel, `${dialogLabel} (expected ${playerLabel})`);

    const player = page.locator('div[role="dialog"] video[controls]');
    check(scope, `${path_} fullscreen player opens`, (await player.count()) === 1, String(await player.count()));

    // Background isolation, scroll lock, initial focus (all measured in page).
    const openState = await page.evaluate(() => ({
      headerInert: document.querySelector("header")?.inert === true,
      footerInert: document.querySelector("footer")?.inert === true,
      bodyOverflow: getComputedStyle(document.body).overflow,
      focusInside: !!document.activeElement && !!document.activeElement.closest('[role="dialog"]'),
      active: document.activeElement?.tagName ?? null,
    }));
    check(scope, `${path_} background inert while open`, openState.headerInert === true && openState.footerInert === true, JSON.stringify(openState));
    check(scope, `${path_} page scroll locked`, openState.bodyOverflow === "hidden", openState.bodyOverflow);
    check(scope, `${path_} focus starts inside the player`, openState.focusInside === true, String(openState.active));

    // Reported defect: Shift+Tab from the close button used to land on a
    // background tile. Focus must stay inside the dialog.
    const focusInside = async (label) => {
      await page.keyboard.press(label);
      await page.waitForTimeout(200);
      return page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        const active = document.activeElement;
        return {
          inside: !!dlg && !!active && dlg.contains(active),
          active: active
            ? `${active.tagName}${active.getAttribute("aria-label") ? `[${active.getAttribute("aria-label")}]` : ""}`
            : null,
        };
      });
    };

    const shiftTab = await focusInside("Shift+Tab");
    check(scope, `${path_} Shift+Tab stays inside the player`, shiftTab.inside === true, shiftTab.active);
    const tab1 = await focusInside("Tab");
    check(scope, `${path_} Tab stays inside the player`, tab1.inside === true, tab1.active);
    const tab2 = await focusInside("Tab");
    check(scope, `${path_} Tab wraps inside the player`, tab2.inside === true, tab2.active);

    // Escape closes it and everything is restored.
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    check(scope, `${path_} Escape closes the player`, (await dialog.count()) === 0, String(await dialog.count()));
    const restored = await page.evaluate(() => ({
      headerInert: document.querySelector("header")?.inert === true,
      footerInert: document.querySelector("footer")?.inert === true,
      bodyOverflow: getComputedStyle(document.body).overflow,
      focusIsTile: document.activeElement?.getAttribute("data-case-block") === "video-tile",
    }));
    check(scope, `${path_} background restored after close`, restored.headerInert === false && restored.footerInert === false, JSON.stringify(restored));
    check(scope, `${path_} scroll restored after close`, restored.bodyOverflow !== "hidden", restored.bodyOverflow);
    check(scope, `${path_} focus returns to the tile`, restored.focusIsTile === true, String(restored.focusIsTile));

    // The localized close button also works.
    await tileButton.click();
    await page.waitForTimeout(400);
    await page.locator(`[role="dialog"] button[aria-label="${closeButton}"]`).first().click();
    await page.waitForTimeout(400);
    check(scope, `${path_} player closes on the close button`, (await dialog.count()) === 0, String(await dialog.count()));
  }

  // Review section (Ukrainian page): play/pause control exists only for a
  // video review, and its accessible name must be translated.
  if (record.review?.kind === "video") {
    await page.goto(`${BASE}${record.uaPath}`, { waitUntil: "domcontentloaded" });
    await settle(page, 700);
    const reviewButton = page.locator('button[aria-label="Відтворити відео"], button[aria-label="Пауза"]').first();
    check(scope, `${record.uaPath} review control localized`, (await reviewButton.count()) === 1);
    const reviewVideo = page.locator('article video[src*="testimonials"]').first();
    const reviewSrc = await reviewVideo.getAttribute("src").catch(() => null);
    check(
      scope,
      `${record.uaPath} review video source`,
      !!reviewSrc && reviewSrc.includes("/media/testimonials/"),
      String(reviewSrc),
    );
  }
}

/** Gallery items that carry an explicit presentation (split / max-width). */
function presentationItems(record) {
  const out = [];
  for (const section of record.sections) {
    if (section.kind === "gallery") {
      section.items.forEach((item) => {
        if (item.presentation) out.push({ item, section: section.kind });
      });
    }
    if (section.kind === "galleryGroups") {
      section.groups.forEach((group) =>
        group.items.forEach((item) => {
          if (item.presentation) out.push({ item, section: section.kind });
        }),
      );
    }
  }
  return out;
}

/**
 * Explicit presentation contract (hope-media-group):
 *  - `splitMobile`: the whole layout is visible on desktop, exactly two
 *    mobile halves of the same file on mobile (original `WideImage`);
 *  - `maxWidth`: the media wrapper is capped so a portrait sheet does not
 *    stretch (280px in the main gallery, `max-w-md` in the groups).
 */
async function checkResponsivePresentation(page, record, scope, viewport) {
  const expected = presentationItems(record).filter(
    ({ item }) => item.presentation.splitMobile || item.presentation.maxWidth,
  );
  if (!expected.length) return;
  await page.goto(`${BASE}${record.uaPath}`, { waitUntil: "domcontentloaded" });
  await settle(page, 1200);
  const isMobileViewport = viewport === "mobile";

  const probe = await page.evaluate(() => {
    const grab = (root) => {
      if (!root) return [];
      return [...root.querySelectorAll('[data-case-block="gallery-item"]')].map((card) => {
        const whole = card.querySelector("img");
        const wrap = whole?.closest("div")?.parentElement ?? null;
        const parts = [...card.querySelectorAll("[data-case-split-part]")];
        return {
          src: whole?.getAttribute("src") ?? "",
          wrapMaxWidth: wrap ? getComputedStyle(wrap).maxWidth : null,
          wholeVisible: !!whole?.getClientRects().length,
          split: parts.map((el) => ({
            side: el.getAttribute("data-case-split-part"),
            visible: !!el.getClientRects().length,
            src: el.querySelector("img")?.getAttribute("src") ?? "",
          })),
        };
      });
    };
    return {
      gallery: grab(document.querySelector('[data-case-block="gallery"]')),
      groups: grab(document.querySelector('[data-case-block="galleryGroups"]')),
    };
  });

  const fileOf = (src) => {
    // next/image serves `/_next/image?url=%2Fmedia%2F…&w=…` — decode first,
    // then take the /media/… file name (query tails use `&`, not `?`).
    const decoded = decodeURIComponent(src ?? "");
    const m = decoded.match(/\/media\/[^&\s"]+/);
    return m ? m[0].split("/").pop() : (decoded.split("/").pop() ?? "");
  };
  const problems = [];
  for (const { item, section } of expected) {
    const file = fileOf(item.src);
    const cards = (section === "gallery" ? probe.gallery : probe.groups).filter((c) => fileOf(c.src) === file);
    if (!cards.length) {
      problems.push(`${file}: картка не знайдена в ${section}`);
      continue;
    }
    const card = cards[0];
    if (item.presentation.splitMobile) {
      const sides = card.split.map((p) => `${p.side}:${p.visible ? "visible" : "hidden"}`).join(",");
      const left = card.split.filter((p) => p.side === "left");
      const right = card.split.filter((p) => p.side === "right");
      const sameSrc = card.split.every((p) => fileOf(p.src) === file);
      const wantVisible = isMobileViewport;
      const halvesOk =
        left.length === 1 &&
        right.length === 1 &&
        sameSrc &&
        card.split.every((p) => p.visible === wantVisible) &&
        card.wholeVisible !== wantVisible;
      if (!halvesOk) problems.push(`${file}: split desktop/mobile (${sides}, whole visible=${card.wholeVisible})`);
    }
    if (item.presentation.maxWidth) {
      const limit = item.presentation.maxWidth === "280px" ? 281 : 449; // max-w-md = 28rem = 448px
      const got = card.wrapMaxWidth;
      const px = got && got.endsWith("px") ? Number.parseFloat(got) : Number.POSITIVE_INFINITY;
      if (!(px <= limit)) problems.push(`${file}: max-width ${got} > ${item.presentation.maxWidth}`);
    }
  }
  check(
    scope,
    `${record.uaPath} responsive presentation (${viewport}, ${expected.length} items)`,
    problems.length === 0,
    problems.join("; "),
  );
}

/**
 * Social proof blocks.
 *
 * 1. Avatars: rendered exactly where the original page rendered them
 *    (`text`/`screenshot`/`audio`, never for a video review) — asserted as
 *    present (1) or absent (0) per language.
 * 2. Media buttons (audio review AND video review): the accessible name must
 *    always mirror the REAL state of the element — `paused ⇒ "play" label`,
 *    `playing ⇒ "pause" label`. The sequence covers a successful start, a
 *    pause, the end of the media, a REJECTED `play()` (the reproduced defect:
 *    the button used to keep showing "Pause" while the element stayed paused)
 *    and a retry after that refusal.
 */
async function checkReviewSocialProof(page, record, scope) {
  const review = record.review;
  if (!review) return;
  const expectsAvatar =
    review.kind === "group"
      ? review.items.some(
          (item) =>
            item.kind !== "video" && (item.avatarName || ("author" in item && item.author)),
          review,
        )
      : !!(review.avatarName || ("author" in review && review.author));

  for (const locale of ["uk", "en"]) {
    const path_ = locale === "en" ? record.enPath : record.uaPath;
    await page.goto(`${BASE}${path_}`, { waitUntil: "domcontentloaded" });
    await settle(page, 1000);

    const avatars = await page
      .locator('[data-case-block="review"] [data-case-block="review-avatar"]')
      .count();
    check(
      scope,
      `${path_} review avatar ${expectsAvatar ? "present" : "absent"}`,
      expectsAvatar ? avatars === 1 : avatars === 0,
      `found ${avatars}`,
    );

    // Review heading: present exactly when the record declares one. The
    // original page may head it with a shared key (`itCases.review`) — that
    // must render, and a page without a heading in its source must stay
    // without one.
    const headings = await page.locator('[data-case-block="review"] h2').allInnerTexts();
    if (review.title) {
      const expected = resolveText(review.title, locale, translations[locale]).trim();
      check(
        scope,
        `${path_} review heading localized`,
        headings.length === 1 && headings[0].trim() === expected,
        JSON.stringify(headings.map((h) => h.trim())) + ` expected="${expected}"`,
      );
    } else {
      check(scope, `${path_} review heading absent`, headings.length === 0, JSON.stringify(headings));
    }

    if (review.kind !== "audio" && review.kind !== "video") continue;
    await checkMediaButton(page, record, locale, path_, scope);
  }
}

/** Label ↔ element-state contract for one review player. */
async function checkMediaButton(page, record, locale, path_, scope) {
  const isAudio = record.review.kind === "audio";
  const mediaSel = isAudio ? '[data-case-block="review"] audio' : '[data-case-block="review"] video';
  const playLabel = translations[locale][isAudio ? "cases.ui.playAudioReview" : "cases.ui.play"];
  const pauseLabel = translations[locale][isAudio ? "cases.ui.pauseAudioReview" : "cases.ui.pause"];
  const button = page.locator('[data-case-block="review"] button[aria-label]');

  check(scope, `${path_} media button exists`, (await button.count()) === 1, String(await button.count()));

  const probe = () =>
    page.evaluate((sel) => {
      const el = document.querySelector(sel);
      const btn = document.querySelector('[data-case-block="review"] button[aria-label]');
      return {
        paused: el ? el.paused : null,
        label: btn ? btn.getAttribute("aria-label") : null,
      };
    }, mediaSel);

  /** The name of the button must equal what the element is actually doing. */
  const invariant = async (step) => {
    const state = await probe();
    const expected = state.paused ? playLabel : pauseLabel;
    check(
      scope,
      `${path_} label ↔ media state (${step})`,
      state.paused !== null && state.label === expected,
      `label="${state.label}" paused=${state.paused} expected="${expected}"`,
    );
    return state;
  };

  let state = await invariant("idle");
  check(scope, `${path_} starts paused`, state.paused === true, String(state.paused));

  // 1 — a click: whatever the engine does, the label must match reality.
  await button.click();
  await page.waitForTimeout(800);
  state = await invariant("after first click");
  check(
    scope,
    `${path_} click outcome consistent`,
    state.paused === false ? state.label === pauseLabel : state.label === playLabel,
    state.paused === false ? "playing → Pause label" : "not started → Play label",
  );

  // 2 — pause it back when it did start.
  if (state.paused === false) {
    await button.click();
    await page.waitForTimeout(500);
    state = await invariant("after pause");
    check(
      scope,
      `${path_} pause restores Play label`,
      state.paused === true && state.label === playLabel,
      `paused=${state.paused} label=${state.label}`,
    );
  }

  // 3 — simulated play() refusal (the reproduced defect).
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    el.__play = el.play;
    el.play = () => Promise.reject(new Error("simulated play() refusal"));
  }, mediaSel);
  await button.click();
  await page.waitForTimeout(600);
  state = await invariant("play() rejected");
  check(
    scope,
    `${path_} rejected play() keeps the Play label`,
    state.paused === true && state.label === playLabel,
    `paused=${state.paused} label=${state.label}`,
  );

  // 4 — restore the real play() and click again: a retry must be attempted.
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    delete el.play;
  }, mediaSel);
  await button.click();
  await page.waitForTimeout(800);
  state = await invariant("retry after refusal");
  if (state.paused === false) {
    check(scope, `${path_} retry starts playback`, state.label === pauseLabel, `label=${state.label}`);
    await button.click();
    await page.waitForTimeout(500);
    await invariant("retry paused again");
  } else {
    check(scope, `${path_} retry did not break the label`, state.label === playLabel, `label=${state.label}`);
  }

  // 5 — end of media: the label returns to "Play".
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.pause();
      el.dispatchEvent(new Event("ended"));
    }
  }, mediaSel);
  await page.waitForTimeout(400);
  state = await invariant("after ended");
  check(
    scope,
    `${path_} ended restores the Play label`,
    state.paused === true && state.label === playLabel,
    `paused=${state.paused} label=${state.label}`,
  );
}

async function checkMobile(page, record, scope) {
  for (const locale of ["uk", "en"]) {
    const path_ = locale === "en" ? record.enPath : record.uaPath;
    const response = await page.goto(`${BASE}${path_}`, { waitUntil: "domcontentloaded" });
    await settle(page, 700);
    const probe = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      h1: document.querySelector("h1")?.textContent.trim(),
      h1Visible: (() => {
        const h = document.querySelector("h1");
        if (!h) return false;
        const r = h.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      })(),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      crumb: !!document.querySelector('nav[aria-label="Навігаційний ланцюжок"], nav[aria-label="Breadcrumb"]'),
      leadVisible: (() => {
        const p = document.querySelector("article p.text-muted-foreground");
        if (!p) return false;
        const r = p.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      })(),
    }));
    check(scope, `${path_} mobile status`, response?.status() === 200, String(response?.status()));
    check(scope, `${path_} mobile lang`, probe.lang === locale, probe.lang);
    check(scope, `${path_} mobile h1 visible`, probe.h1Visible, probe.h1);
    check(scope, `${path_} mobile hero text visible`, probe.leadVisible);
    check(scope, `${path_} mobile breadcrumb visible`, probe.crumb);
    check(scope, `${path_} no horizontal overflow`, probe.overflow <= 1, `${probe.overflow}px`);
  }
}

/** Both themes: the default run is dark (the theme cookie is absent), so the
 *  light theme is asserted here with an explicit SITE_THEME cookie. */
async function checkLightTheme(page, record, scope) {
  await page.goto(`${BASE}${record.uaPath}`, { waitUntil: "domcontentloaded" });
  await settle(page, 500);
  const probe = await page.evaluate(() => ({
    theme: document.documentElement.getAttribute("data-theme"),
    h1Visible: !!document.querySelector("h1")?.getClientRects().length,
    crumbVisible: !!document.querySelector('nav[aria-label="Навігаційний ланцюжок"]')?.getClientRects().length,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
  }));
  check(scope, `${record.uaPath} light theme applied`, probe.theme === "light", String(probe.theme));
  check(scope, `${record.uaPath} light theme h1 visible`, probe.h1Visible === true);
  check(scope, `${record.uaPath} light theme breadcrumb visible`, probe.crumbVisible === true);
  check(scope, `${record.uaPath} light theme no overflow`, probe.overflow <= 1, `${probe.overflow}px`);
}

/**
 * prefers-reduced-motion must reach every new component, not only the hero:
 * no block may stay hidden, mid-reveal or blurred while the setting is on.
 *
 * Checked per language: hero frame, brief cards, materials (feature images,
 * comparisons, gallery, video tiles), results and the review card.
 */
async function checkReducedMotion(page, record, scope) {
  const expectedKinds = new Set(record.sections.map((section) => section.kind));
  for (const locale of ["uk", "en"]) {
    const path_ = locale === "en" ? record.enPath : record.uaPath;
    await page.goto(`${BASE}${path_}`, { waitUntil: "domcontentloaded" });
    await settle(page, 800);
    const probe = await page.evaluate(() => {
      const style = (el) => {
        const cs = getComputedStyle(el);
        return {
          visible: !!el.getClientRects().length,
          opacity: cs.opacity,
          filter: cs.filter,
          transform: cs.transform,
        };
      };
      const all = (sel) => [...document.querySelectorAll(sel)].map(style);
      // Reveal nodes carry `data-reveal` (FadeIn) or their own block marker
      // (brief cards, feature images, hero frame). Decorative subsystems —
      // CurvedDashedLines and the StackRail it hosts through a portal — keep
      // their own reveal state on purpose and are not page content.
      const revealStyles = () =>
        [
          ...document.querySelectorAll("[data-reveal]"),
          ...document.querySelectorAll('[data-case-block="brief"]'),
          ...document.querySelectorAll('[data-case-block="feature-image"]'),
          ...document.querySelectorAll('[data-case-block="hero"] > div'),
        ].map((el) => {
          const cs = getComputedStyle(el);
          return {
            visible: !!el.getClientRects().length,
            opacity: cs.opacity,
            filter: cs.filter,
            transform: cs.transform,
            tag: el.tagName,
          };
        });
      // A blur pass anywhere inside a content block means an animation
      // survived the setting (decorative blur is `backdrop-filter`, not
      // `filter`, and is never used here).
      const scan = (sel) => {
        const root = document.querySelector(sel);
        if (!root) return { present: false, bad: [] };
        const bad = [];
        for (const el of root.querySelectorAll("*")) {
          // Decorative blur lives in the StackRail (ported into the decorated
          // section by CurvedDashedLines) and in SVG strokes — neither is a
          // reveal animation of the page content.
          if (el.closest(".stack-rail, .curved-dashed-lines, svg")) continue;
          const cs = getComputedStyle(el);
          if (cs.filter && cs.filter.includes("blur")) {
            bad.push(`blur filter on ${String(el.className).slice(0, 40)}`);
          }
        }
        return { present: true, bad };
      };
      return {
        reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        h1Visible: !!document.querySelector("h1")?.getClientRects().length,
        hero: (() => {
          const frame = document.querySelector('[data-case-block="hero"]');
          const inner = frame?.firstElementChild ?? null;
          return { frame: frame ? style(frame) : null, inner: inner ? style(inner) : null };
        })(),
        brief: all('[data-case-block="brief"]'),
        reveals: revealStyles(),
        counts: {
          featureImage: document.querySelectorAll('[data-case-block="feature-image"]').length,
          featureSlider: document.querySelectorAll('[data-case-block="feature-slider"]').length,
          galleryItem: document.querySelectorAll('[data-case-block="gallery-item"]').length,
          compareItem: document.querySelectorAll('[data-case-block="compare-item"]').length,
          videoTile: document.querySelectorAll('[data-case-block="video-tile"]').length,
          resultsItems: document.querySelectorAll('[data-case-block="results"] li').length,
          reviewCard: document.querySelectorAll('[data-case-block="review"] .featured-case-card').length,
        },
        blocks: {
          featureList: scan('[data-case-block="featureList"]'),
          compare: scan('[data-case-block="compare"]'),
          gallery: scan('[data-case-block="gallery"]'),
          videoGrid: scan('[data-case-block="videoGrid"]'),
          results: scan('[data-case-block="results"]'),
          review: scan('[data-case-block="review"]'),
        },
      };
    }).catch((err) => ({ error: String(err.message || err) }));

    if (probe.error) {
      check(scope, `${path_} reduced-motion probe`, false, probe.error);
      continue;
    }

    check(scope, `${path_} reduced-motion emulated`, probe.reduce === true, String(probe.reduce));
    check(scope, `${path_} h1 visible without motion`, probe.h1Visible === true);

    // The verdict runs here: a function cannot cross the evaluate boundary.
    const isStatic = (style) =>
      !!style &&
      style.visible === true &&
      Number(style.opacity) === 1 &&
      !(style.filter || "").includes("blur") &&
      (style.transform === "none" || style.transform === "matrix(1, 0, 0, 1, 0, 0)");

    const heroStatic =
      probe.hero?.frame !== null &&
      probe.hero?.inner !== null &&
      [probe.hero?.frame, probe.hero?.inner].every(isStatic);
    check(scope, `${path_} hero static`, heroStatic === true, JSON.stringify(probe.hero));

    const briefStatic = (probe.brief ?? []).length === 2 && probe.brief.every(isStatic);
    check(scope, `${path_} brief cards static (2)`, briefStatic === true, JSON.stringify(probe.brief));

    const revealProblems = (probe.reveals ?? []).filter((style) => !isStatic(style));
    check(
      scope,
      `${path_} reveal nodes static (${(probe.reveals ?? []).length})`,
      (probe.reveals ?? []).length > 0 && revealProblems.length === 0,
      JSON.stringify(revealProblems.slice(0, 3)),
    );

    const hasVideoGrid =
      record.hero.kind === "videoGrid" || record.hero.kind === "video" || expectedKinds.has("videoGrid");
    const materialCounts = [
      [
        "feature images/sliders",
        expectedKinds.has("featureList")
          ? probe.counts.featureImage + probe.counts.featureSlider > 0
          : probe.counts.featureImage + probe.counts.featureSlider === 0,
      ],
      ["gallery items", expectedKinds.has("gallery") ? probe.counts.galleryItem > 0 : probe.counts.galleryItem === 0],
      ["compare items", expectedKinds.has("compare") ? probe.counts.compareItem > 0 : probe.counts.compareItem === 0],
      ["video tiles", hasVideoGrid ? probe.counts.videoTile > 0 : probe.counts.videoTile === 0],
    ];
    for (const [name, ok] of materialCounts) {
      check(scope, `${path_} materials present: ${name}`, ok, JSON.stringify(probe.counts));
    }

    for (const kind of ["featureList", "compare", "gallery", "videoGrid", "results", "review"]) {
      if (!expectedKinds.has(kind) && !(kind === "review" && record.review)) continue;
      const scan = probe.blocks[kind];
      check(scope, `${path_} ${kind} block found`, scan.present === true, JSON.stringify(scan));
      check(scope, `${path_} ${kind} has no hidden/blurred nodes`, scan.present === true && scan.bad.length === 0, JSON.stringify(scan.bad.slice(0, 3)));
    }

    if (expectedKinds.has("results")) {
      const wanted = record.sections.find((section) => section.kind === "results")?.items.length ?? 0;
      check(scope, `${path_} results items visible`, probe.counts.resultsItems === wanted, `${probe.counts.resultsItems}/${wanted}`);
    }
    if (record.review) {
      check(scope, `${path_} review card visible`, probe.counts.reviewCard > 0, String(probe.counts.reviewCard));
    }
  }
}

async function runEngine(browserType, engineName) {
  const browser = await browserType.launch();
  console.log(`\n=== ${engineName} ===`);
  const byId = Object.fromEntries(records.map((r) => [r.id, r]));

  // Desktop
  const scopeD = `${engineName} desktop`;
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const d = suite(desktop, scopeD);
  for (const record of records) {
    await d.recycle();
    await d.run(`${record.id} UA page`, (page) => checkCasePage(page, record, "uk", scopeD));
    await d.run(`${record.id} EN page`, (page) => checkCasePage(page, record, "en", scopeD));
    await d.run(`${record.id} language switch`, (page) => checkLanguageSwitch(page, record, scopeD));
    await d.run(`${record.id} back/forward`, (page) => checkBackForward(page, record, scopeD));
  }
  // Material behaviour of the three different block mixes.
  await d.recycle();
  if (byId["design/nastya-portrait-retouch"]) {
    await d.run("nastya image modal", (page) => checkImageModal(page, byId["design/nastya-portrait-retouch"], scopeD));
  }
  if (byId["it/eva-code"]) {
    await d.run("eva-code image modal", (page) => checkImageModal(page, byId["it/eva-code"], scopeD));
  }
  for (const record of records) {
    await d.recycle();
    if (videoTileExpectation(record) > 0) {
      await d.run(`${record.id} video modal`, (page) => checkVideoModal(page, record, scopeD));
    }
    if (presentationItems(record).length) {
      await d.run(`${record.id} responsive presentation`, (page) =>
        checkResponsivePresentation(page, record, scopeD, "desktop"),
      );
    }
    if (sceneSections(record).length) {
      await d.run(`${record.id} scenes`, (page) => checkScenes(page, record, scopeD, "desktop"));
    }
  }
  for (const record of records) {
    await d.recycle();
    await d.run(`${record.id} review avatar/media button`, (page) => checkReviewSocialProof(page, record, scopeD));
  }
  await d.recycle();
  await desktop.close();

  // Mobile
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });
  const scopeM = `${engineName} mobile`;
  const m = suite(mobile, scopeM);
  for (const record of records) {
    await m.recycle();
    await m.run(`${record.id} mobile`, (page) => checkMobile(page, record, scopeM));
  }
  await m.recycle();
  if (byId["design/nastya-portrait-retouch"]) {
    await m.run("nastya image modal", (page) => checkImageModal(page, byId["design/nastya-portrait-retouch"], scopeM));
  }
  for (const record of records) {
    await m.recycle();
    if (videoTileExpectation(record) > 0) {
      await m.run(`${record.id} video modal`, (page) => checkVideoModal(page, record, scopeM));
    }
    if (presentationItems(record).length) {
      await m.run(`${record.id} responsive presentation`, (page) =>
        checkResponsivePresentation(page, record, scopeM, "mobile"),
      );
    }
    if (sceneSections(record).length) {
      await m.run(`${record.id} scenes`, (page) => checkScenes(page, record, scopeM, "mobile"));
    }
  }
  await m.recycle();
  await mobile.close();

  // Reduced motion (desktop viewport)
  const reduced = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const scopeR = `${engineName} reduced-motion`;
  const r = suite(reduced, scopeR);
  for (const record of records) {
    await r.recycle();
    await r.run(`${record.id} reduced motion`, (page) => checkReducedMotion(page, record, scopeR));
  }
  await r.recycle();
  await reduced.close();

  // Light theme (desktop, UA + EN)
  const light = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await light.addCookies([{ name: "SITE_THEME", value: "light", url: BASE }]);
  const scopeL = `${engineName} light-theme`;
  const l = suite(light, scopeL);
  for (const record of records) {
    await l.recycle();
    await l.run(`${record.id} light theme`, (page) => checkLightTheme(page, record, scopeL));
  }
  await l.recycle();
  await light.close();

  await browser.close();
}

/* ── media availability (HTTP) ── */
async function checkMedia() {
  const scope = "media http";
  const paths = [...new Set(records.flatMap((r) => registry.collectRecordMedia(r)))];
  let ok = 0;
  for (const p of paths) {
    try {
      const res = await fetch(`${BASE}${p}`, { method: "HEAD" });
      if (res.status === 200) ok += 1;
      else check(scope, `HEAD ${p}`, false, String(res.status));
    } catch (err) {
      check(scope, `HEAD ${p}`, false, String(err.message));
    }
  }
  check(scope, `all ${paths.length} record media reachable`, ok === paths.length, `${ok}/${paths.length}`);
}

for (const [name, type] of ENGINES) {
  await runEngine(type, name);
}
await checkMedia();

const passed = results.filter((r) => r.ok).length;
const summary = [
  `Package 4 case pages — browser checks`,
  `base: ${BASE}`,
  `engines: ${ENGINES.map(([n]) => n).join(", ")} (Playwright builds, not installed Chrome/Safari)`,
  `cases: ${records.map((r) => r.id).join(", ")}`,
  `checked: ${results.length} · passed: ${passed} · failed: ${failures}`,
  `duration: ${Math.round((Date.now() - t0) / 1000)}s`,
  "",
  ...results.map((r) => `${r.ok ? "✓" : "✗"} [${r.scope}] ${r.name}${r.detail ? ` — ${r.detail}` : ""}`),
  "",
  failures === 0 ? "RESULT: PASS" : `RESULT: FAIL (${failures})`,
];
fs.writeFileSync(OUT, summary.join("\n"));
console.log(`\nchecked ${results.length}, passed ${passed}, failed ${failures}`);
console.log(`report: ${path.relative(process.cwd(), OUT)}`);
process.exit(failures === 0 ? 0 : 1);
