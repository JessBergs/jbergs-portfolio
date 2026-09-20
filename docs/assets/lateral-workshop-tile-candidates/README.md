# Lateral Workshop tile — backup candidates

The live tile (`public/images/lateral-workshop-2026.jpg`) uses variant C8: the
workshop site's own social preview (Berkeley watercolour + wordmark) with the
Kairos, BlueDot Impact and Constellation logos in brand colours (BlueDot in its
button blue from bluedot.org, #1144cc), bottom right, over a very soft semi-transparent white underlay that runs into
pure white at the bottom edge.

These are the other 16:9 candidates prepared on 2026-09-19, kept as backups:

- `A-speaker-grid.jpg` — full speaker grid on washed watercolour
- `B-hero-row.jpg` — hero row of five, Jess centre (was the tile in PR #42)
- `D-split.jpg` — watercolour + wordmark left, 3x3 faces right
- `C-site-og-image.jpg` — variant C without logos (the tile after PR #43)
- `C7-blue-more-feathered.jpg` — as C8 but a contained glow, no fade to white at the edge
- `C4-colour-feathered-bottom.jpg` — as C7 with a tighter feather and BlueDot's dark wordmark
- `C1-logos-colour-panel.jpg` — brand-colour logos on a crisp cream rounded panel
- `C5-colour-top-noglow.jpg` — brand-colour logos top right on the sky, no glow
- `C6-colour-top-feathered.jpg` — as C5 with a light feathered glow
- `C2-logos-mono-panel.jpg` — as C1 but logos recoloured to the site's dark pine
- `C3-logos-mono-nopanel.jpg` — dark-pine logos straight on the watercolour, no panel

`make_logo_tiles_v4.py` builds C8, `make_logo_tiles_v3.py` builds C7 (from `bluedot_blue.svg`), `make_logo_tiles_v2.py` builds C4–C6 and `make_logo_tiles.py` builds C1–C3 from `C-site-og-image.png` plus the logo files
here (`kairos.png`, `bluedot_dark.svg`, `constellation.svg`; the SVGs need
rasterising first, e.g. with cairosvg).

`make_tiles.py` regenerates all four from the workshop site's assets (headshots,
watercolour, palette); it expects those under a `src/` folder next to it and
needs Pillow. Nothing in this folder is served by the site.
