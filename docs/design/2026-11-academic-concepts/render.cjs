/* Renders of each variant with Playwright: desktop first screen (PNG), desktop full page (JPEG,
   to keep the repo small), phone first screen (PNG). Point PLAYWRIGHT_PKG at a playwright install if it is not on NODE_PATH.
   Usage: node render.cjs [--live] [v1-news-list ...]  (--live also captures www.jbergs.eu as a baseline)   Falls back to ./render.sh if Playwright is missing. */
const path = require('path');
const fs = require('fs');
const pw = require(process.env.PLAYWRIGHT_PKG || 'playwright');

const all = ['a-column', 'b-sidebar', 'c-dated-band', 'd-typed-lists', 'e-year-gutter', 'b2-sidebar-site-theme'];
const args = process.argv.slice(2);
const live = args.includes('--live');
const variants = args.filter((a) => a !== '--live').length ? args.filter((a) => a !== '--live') : all;

(async () => {
  fs.mkdirSync(path.join(__dirname, 'shots'), { recursive: true });
  const browser = await pw.chromium.launch();
  for (const v of variants) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('file://' + path.join(__dirname, v + '.html'), { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(__dirname, 'shots', v + '-fold.png') });
    await page.screenshot({ path: path.join(__dirname, 'shots', v + '-full.jpg'), fullPage: true, type: 'jpeg', quality: 82 });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(__dirname, 'shots', v + '-mobile.png') });
    await page.close();
    console.log(v, 'done');
  }
  if (live) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('https://www.jbergs.eu/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(__dirname, 'shots', 'current-live-fold.png') });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(__dirname, 'shots', 'current-live-full.jpg'), fullPage: true, type: 'jpeg', quality: 82 });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(__dirname, 'shots', 'current-live-mobile.png') });
    await page.close();
    console.log('live baseline done');
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
