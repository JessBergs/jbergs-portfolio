/* Captures first-screen and full-page renders of public researcher homepages for design reference.
   The shots folder is gitignored: these are other people's sites, kept locally for study only.
   Usage: PLAYWRIGHT_PKG=... node capture.cjs [key ...] */
const path = require('path');
const fs = require('fs');
const pw = require(process.env.PLAYWRIGHT_PKG || 'playwright');
const SITES = require('./sites.json');
const keys = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SITES);
(async () => {
  const out = path.join(__dirname, 'shots');
  fs.mkdirSync(out, { recursive: true });
  const browser = await pw.chromium.launch();
  for (const k of keys) {
    const url = SITES[k];
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 25000 });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(out, k + '-fold.jpg'), type: 'jpeg', quality: 80 });
      await page.evaluate(async () => { for (let y = 0; y < Math.min(document.body.scrollHeight, 9000); y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(out, k + '-full.jpg'), fullPage: true, type: 'jpeg', quality: 70 });
      console.log('ok ', k);
    } catch (e) { console.log('ERR', k, e.message.split('\n')[0]); }
    await page.close();
  }
  await browser.close();
})();
