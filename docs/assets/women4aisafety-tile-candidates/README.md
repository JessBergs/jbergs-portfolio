# Women4AISafety tile — candidates

The live tile (`public/images/women4aisafety-2026.jpg`) uses variant **A**: the
event graphic from the Women4AISafety LinkedIn post (28 October 2026 online
session) on the left, the blue W4AIS wordmark on the cream card background
(`#fefcf9`) on the right. Same logo-on-cream treatment as the Successif and
Lateral tiles.

The source graphic is square, so a plain 16:9 crop loses either the portrait or
the wordmark (the portrait ring overlaps the top of the wordmark, so there is no
clean wordmark-only window); the split keeps both.

## The candidates (all 1200x675, capped at 150 KB)

- `A-split-logo-right.jpg` — **live tile.** Graphic left, wordmark on cream right
- `B-split-logo-left.jpg` — as A, mirrored
- `C-pillarbox.jpg` — the whole graphic centred on cream, no wordmark

## Regenerating

```bash
uv run --with pillow python -I make_tiles.py <screenshot-of-the-linkedin-post.png>
```

`GRAPHIC` in the script is the graphic's box inside the 1142x1432 screenshot.
`w4ais_logo.png` is the colour wordmark from women4aisafety.com. Nothing in this
folder is served by the site.
