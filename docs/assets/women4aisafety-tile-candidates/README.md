# Women4AISafety tile — candidates

The live tile (`public/images/women4aisafety-2026.jpg`) uses variant **A**: the
event graphic from the Women4AISafety LinkedIn post (28 October 2026 online
session) with its speckled gradient background extended to fill 16:9. The
purple base strip is dropped, and the content gets equal background margins:
the distance from the portrait ring to the top edge equals the distance from
the date line to the bottom edge.

The source graphic is square. Sideways, the extension copies random pixels
from content-free slivers at the left and right edges (keeping the top-bottom
gradient); above and below, from content-free bands at the top and just under
the date line (keeping the left-right gradient). Each copied pixel comes from
within a few rows or columns of its own position, so there is no seam or
banding. Earlier variants that put the W4AIS wordmark on a cream panel beside
the graphic were dropped: the wordmark appeared twice.

## The candidates (all 1200x675, capped at 150 KB)

- `A-no-strip.jpg` — **live tile.** No purple strip, equal top and bottom margins
- `B-strip-spaced.jpg` — purple strip kept, with extra background between the date line and the strip

## Regenerating

```bash
uv run --with pillow python -I make_tiles.py <screenshot-of-the-linkedin-post.png>
```

`GRAPHIC` in the script is the graphic's box inside the 1142x1432 screenshot;
`GAP` and `STRIP_GAP` set the margins. The ring, the date line and the strip
are located automatically. Nothing in this folder is served by the site.
