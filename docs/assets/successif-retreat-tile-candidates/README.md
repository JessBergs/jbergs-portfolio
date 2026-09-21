# Successif Women in AI Safety Retreat tile — candidates

The live tile (`public/images/successif-womens-retreat-2026.jpg`) uses variant
**A**: the cohort photo outside Pendley Manor with the Successif wordmark in
brand colours bottom right, over a soft oval of cream (`#fefcf9`, the card
background) sitting on the tarmac. Same treatment as the Lateral Workshop tile,
so the two invited-participant tiles read as a pair.

The subject is the group, so every candidate keeps the whole row of people in
frame and puts the wordmark somewhere that covers nobody — either the tarmac
foreground or a cream strip below the photo.

## The candidates (all 1200x675, ~190–215 KB)

- `A-logo-br-on-tarmac.jpg` — **live tile.** Colour logo bottom right on a soft cream oval
- `B-logo-bl-on-tarmac.jpg` — as A, mirrored to the bottom left
- `C-cream-strip.jpg` — the group as a panorama above a cream strip, logo left
- `D-cream-strip-right.jpg` — as C, logo right-aligned
- `E-panel-br.jpg` — crisp rounded cream panel on the tarmac, bottom right
- `F-white-on-tarmac.jpg` — white wordmark straight onto the tarmac, no scrim;
  the ground is dark and even enough to carry it
- `G-closer.jpg` — A's treatment on a closer window: bigger group, less manor

## Crop

`GROUP_16_9 = (0, 620, 8000, 5120)` — the full frame width, which is the widest
a 16:9 window of this photo can be and so as far out as it zooms without
letterboxing. The bottom sits just past the feet and shadows (which end at
y 4720), leaving a 60px band of tarmac on the finished tile: about half the
previous framing, and the least that still fits the wordmark underneath the
group without touching anyone.

`GROUP_PANORAMA = (0, 330, 8000, 4830)` is used by the cream-strip variants,
which carry the logo outside the image and so need no tarmac at all.

## Regenerating

```bash
python3 make_tiles.py ~/dev/IMG_6020.jpg
```

Needs Pillow. The logo files here (`successif_logo.png`, `successif_logo_white.png`)
come from successif.org. Nothing in this folder is served by the site.
