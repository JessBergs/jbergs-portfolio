/* Like capture.cjs, but reads {key: {url, who, field}} from a sites file, records HTTP status,
   final URL and page title into shots/<key>.json, and takes a slice of keys so batches can run
   in parallel: node capture2.cjs sites-high-profile.json 0 60 */
const path = require('path');
const fs = require('fs');
const pw = require(process.env.PLAYWRIGHT_PKG || 'playwright');
const [file, from = '0', to = '9999'] = process.argv.slice(2);
const SITES = require('./' + file);
const keys = Object.keys(SITES).slice(+from, +to);
(async () => {
  const out = path.join(__dirname, 'shots');
  fs.mkdirSync(out, { recursive: true });
  const browser = await pw.chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
  for (const k of keys) {
    const { url } = SITES[k];
    const page = await ctx.newPage();
    const meta = { key: k, url };
    try {
      const resp = await page.goto(url, { waitUntil: 'load', timeout: 25000 });
      meta.status = resp ? resp.status() : null;
      meta.final = page.url();
      await page.waitForTimeout(1500);
      meta.title = await page.title();
      await page.screenshot({ path: path.join(out, k + '-fold.jpg'), type: 'jpeg', quality: 80 });
      await page.evaluate(async () => { for (let y = 0; y < Math.min(document.body.scrollHeight, 9000); y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(out, k + '-full.jpg'), fullPage: true, type: 'jpeg', quality: 70 });
      console.log('ok ', meta.status, k, meta.title.slice(0, 60));
    } catch (e) { meta.error = e.message.split('\n')[0]; console.log('ERR', k, meta.error.slice(0, 80)); }
    fs.writeFileSync(path.join(out, k + '.json'), JSON.stringify(meta));
    await page.close();
  }
  await browser.close();
})();
