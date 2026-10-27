# Women4AISafety tile — candidates

The live tile (`public/images/women4aisafety-2026.jpg`) is candidate **C**: the
event graphic rebuilt from the organiser's deck template, so that the tile's
16:9 background is the template's own 1920x1080 speckled gradient rather than
an extension synthesised from the square graphic. The portrait in its blue
disc, the BlueDot Impact logo, the name badge, the WOMEN4AISAFETY wordmark and
the date lines are lifted off the template's square cover and placed on that
background with the same margins as candidate A: equal distance from the disc
to the top edge and from the date line to the bottom edge, the purple base
strip dropped.

The template is a Google Slides export, and two of its features are not drawn
by LibreOffice, which `make_tile_from_template.py` uses to render the cover:
the portrait's circular crop and the blue highlights behind the date lines.
The script reconstructs both (an ellipse filled with the portrait; highlight
boxes painted around the rendered text). The cover is rendered on a white and
on a black page background and the difference gives the exact alpha of every
shape, so the lift has no fringes. The gradient's grain is finer than JPEG can
keep under the size cap, so the downsampled background is softened by 0.8 px.

Candidates A and B were built earlier from a screenshot of the LinkedIn post
by `make_tiles.py`, which extends the square graphic's background sideways and
vertically by copying content-free blocks of it. They are kept for comparison.

## The candidates (all 1200x675, capped at 150 KB)

- `C-template-background.jpg` — **live tile.** Template background, lifted shapes
- `A-no-strip.jpg` — synthesised background, no purple strip, equal top and bottom margins
- `B-strip-spaced.jpg` — synthesised background, purple strip kept, extra background between the date line and the strip

## Regenerating

```bash
# C (live): from the organiser's deck template, which is not part of the repo
uv run --with pillow --with numpy python -I make_tile_from_template.py <template.odp>

# A and B: from a screenshot of the LinkedIn post
uv run --with pillow python -I make_tiles.py <screenshot-of-the-linkedin-post.png>
```

`make_tile_from_template.py` needs `soffice` and `pdftoppm` on PATH. `MARGIN`
sets the margins, `HILITE_PAD_*` the highlight padding, `BG_SOFTEN` the
background softening. In `make_tiles.py`, `GRAPHIC` is the graphic's box inside
the 1142x1432 screenshot and `GAP` / `STRIP_GAP` set the margins. Nothing in
this folder is served by the site.
