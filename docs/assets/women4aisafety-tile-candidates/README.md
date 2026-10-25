# Women4AISafety tile — candidates

The live tile (`public/images/women4aisafety-2026.jpg`) uses variant **A**: the
event graphic from the Women4AISafety LinkedIn post (28 October 2026 online
session), centred, with its speckled gradient background and purple base strip
extended on both sides to fill 16:9.

The source graphic is square. The extension copies random content-free columns
from the nearest edge of the graphic, so the gradient, the speckle and the strip
continue without a seam. Earlier variants that put the W4AIS wordmark on a cream
panel beside the graphic were dropped: the wordmark appeared twice.

## The candidates (all 1200x675, capped at 150 KB)

- `A-extended-centred.jpg` — **live tile.** Graphic centred, background extended both sides
- `B-extended-left.jpg` — graphic flush left, background extended to the right only

## Regenerating

```bash
uv run --with pillow python -I make_tiles.py <screenshot-of-the-linkedin-post.png>
```

`GRAPHIC` in the script is the graphic's box inside the 1142x1432 screenshot;
`RIGHT_SLIVER` and the measured left sliver are the content-free edge columns
the extension samples from. Nothing in this folder is served by the site.
