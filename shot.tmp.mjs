import { chromium } from 'playwright';

const base = 'http://localhost:3112';
const routes = [
  ['home-uk', '/'],
  ['home-en', '/en'],
  ['cases-uk', '/cases'],
  ['case-detail-uk', '/cases/design/color-correction'],
  ['services-uk', '/services/it'],
];

const browser = await chromium.launch();
for (const [theme, tag] of [['dark', 'dark'], ['light', 'light']]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.addInitScript((t) => {
    try { localStorage.setItem('theme', t); } catch {}
  }, theme);
  for (const [name, path] of routes) {
    await page.goto(base + path, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `/tmp/shots/${name}-${tag}.png` });
    // overflow check
    const overflow = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    console.log(`${name}-${tag}`, JSON.stringify(overflow));
  }
  await ctx.close();
}
await browser.close();
