# Pivotal Research mentoring tile

The live tile (`public/images/pivotal-ais-fellowship-2027.jpg`) is styled after
Jess's mentor profile page on pivotal-research.org: a square profile photo with
the site's stepped white-squares corner mark, the "pivotal" wordmark, and the
role in monospace ("Mentor:" with the boxed "Q1 2027 AIS" tag as on the page,
then "AI Safety Fellowship"). The background is Pivotal's Open Graph image
(white centre, lavender pixel mosaic at the sides) scaled to 675 tall and
centre-cropped to 1200 wide; the wordmark is lifted out of it and re-placed.

## Files

- `make_tile.py` — generator; writes `tile.jpg` here and the live file
- `pivotal-og-image.png` — `https://www.pivotal-research.org/opengraph-image.png`
- `jess-photo.png` — the profile photo from the mentor page

## Regenerating

```bash
uv run --with pillow python -I make_tile.py
```

Text is set in DejaVu Sans Mono (`/usr/share/fonts/truetype/dejavu/`), the
closest system font to the page's monospace. Nothing in this folder is served
by the site.
