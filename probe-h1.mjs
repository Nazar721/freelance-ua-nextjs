import { chromium } from 'playwright';
const b = await chromium.launch({ args: ['--no-sandbox'] });
const p = await b.newPage();
await p.goto('http://localhost:3011/cases/video/wine-festival', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(600);
const r = await p.evaluate(() => {
  const h = document.querySelector('h1');
  return { innerText: JSON.stringify(h.innerText), textContent: JSON.stringify(h.textContent), html: h.outerHTML };
});
console.log(r.innerText, '|', r.textContent, '|', r.html.slice(0, 120));
await b.close();
