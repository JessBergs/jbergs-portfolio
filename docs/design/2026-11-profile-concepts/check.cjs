/* Load each page and print console errors and uncaught exceptions. */
const path = require('path');
const pw = require(process.env.PLAYWRIGHT_PKG || 'playwright');
(async () => {
  const b = await pw.chromium.launch();
  for (const v of ['a-two-column', 'b-lab-page', 'c-year-grid', 'd-connected', 'e-four-views']) {
    const page = await b.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
    await page.goto('file://' + path.join(__dirname, v + '.html'), { waitUntil: 'load' });
    await page.waitForTimeout(300);
    console.log(v, errs.length ? '\n  ' + errs.join('\n  ') : 'ok');
    await page.close();
  }
  await b.close();
})();
