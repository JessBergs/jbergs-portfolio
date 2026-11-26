// Renders the iaS talk thumbnail: an iaS logo, centred on a 1200x675 canvas.
// Run from the repo root:  node docs/assets/ias-pdoom-talk-tile/make_tile.cjs
// Writes both variants here; the live one is copied to public/images/ (see README).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const dir = __dirname;
const svg = (f) => fs.readFileSync(path.join(dir, f), 'utf8').replace(/<\?xml[^>]*>/, '');

const variants = {
  // White logo with the "Seguridad de la IA" legend on iaS orange (#ff4500).
  orange: { bg: '#ff4500', logo: svg('logo-ias-white-legend.svg'), width: 760 },
  // Colour logo (orange "S", dark "ia") on white.
  white: { bg: '#ffffff', logo: svg('logo-ias-color.svg'), width: 640 },
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 675 } });
  for (const [name, v] of Object.entries(variants)) {
    await page.setContent(`<!doctype html><html><body style="margin:0;width:1200px;height:675px;
      background:${v.bg};display:flex;align-items:center;justify-content:center">
      <div style="width:${v.width}px">${v.logo.replace('<svg', '<svg style="width:100%;height:auto;display:block"')}</div>
      </body></html>`);
    await page.screenshot({ path: path.join(dir, `tile-${name}.png`) });
  }
  await browser.close();
})();
