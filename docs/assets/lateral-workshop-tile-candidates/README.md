# Lateral Workshop tile — backup candidates

The live tile (`public/images/lateral-workshop-2026.jpg`) uses variant C1: the
workshop site's own social preview (Berkeley watercolour + wordmark) with the
Kairos, BlueDot Impact and Constellation logos on a cream panel, in brand colours.

These are the other 16:9 candidates prepared on 2026-09-19, kept as backups:

- `A-speaker-grid.jpg` — full speaker grid on washed watercolour
- `B-hero-row.jpg` — hero row of five, Jess centre (was the tile in PR #42)
- `D-split.jpg` — watercolour + wordmark left, 3x3 faces right
- `C-site-og-image.jpg` — variant C without logos (the tile after PR #43)
- `C2-logos-mono-panel.jpg` — as C1 but logos recoloured to the site's dark pine
- `C3-logos-mono-nopanel.jpg` — dark-pine logos straight on the watercolour, no panel

`make_logo_tiles.py` builds C1–C3 from `C-site-og-image.png` plus the logo files
here (`kairos.png`, `bluedot_dark.svg`, `constellation.svg`; the SVGs need
rasterising first, e.g. with cairosvg).

`make_tiles.py` regenerates all four from the workshop site's assets (headshots,
watercolour, palette); it expects those under a `src/` folder next to it and
needs Pillow. Nothing in this folder is served by the site.
