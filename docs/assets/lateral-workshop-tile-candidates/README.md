# Lateral Workshop tile — backup candidates

The live tile (`public/images/lateral-workshop-2026.jpg`) uses variant C, the
workshop site's own social preview (Berkeley watercolour + wordmark).

These are the other 16:9 candidates prepared on 2026-09-19, kept as backups:

- `A-speaker-grid.jpg` — full speaker grid on washed watercolour
- `B-hero-row.jpg` — hero row of five, Jess centre (was the tile in PR #42)
- `D-split.jpg` — watercolour + wordmark left, 3x3 faces right

`make_tiles.py` regenerates all four from the workshop site's assets (headshots,
watercolour, palette); it expects those under a `src/` folder next to it and
needs Pillow. Nothing in this folder is served by the site.
