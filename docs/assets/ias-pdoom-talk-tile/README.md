# iaS talk thumbnail

Thumbnail for the "Reducir el p(doom) está en nuestras manos (también)" entry
in `src/data/events.json`. The live file is
`public/images/ias-pdoom-talk-2026.png`: the white iaS logo with its
"Hub de seguridad de la IA" legend, centred on iaS orange (`#ff4500`).

The site has no Open Graph image and its only photos show other speakers, so
the tile is built from the logo instead.

## Files

- `make_tile.cjs`: renders both variants with Playwright's Chromium
- `logo-ias-white-legend.svg`: `https://www.aisafety.es/_astro/logo_blanco_con_leyenda.BElG2bQ1.svg`
- `logo-ias-color.svg`: `https://www.aisafety.es/_astro/logo-ias-color.CE_G8v76.svg`
- `tile-orange.png` (live) and `tile-white.png` (colour logo on white, unused)

## Regenerating

```bash
node docs/assets/ias-pdoom-talk-tile/make_tile.cjs
python3 -c "from PIL import Image; Image.open('docs/assets/ias-pdoom-talk-tile/tile-orange.png').convert('RGB').quantize(colors=64).save('public/images/ias-pdoom-talk-2026.png', optimize=True)"
```

Nothing in this folder is served by the site.
