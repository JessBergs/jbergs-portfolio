# Successif Women's Programme tile — candidates

The live tile (`public/images/successif-womens-retreat-2026.jpg`) uses variant
**A**: Jess's photo of Pendley Manor with the Successif wordmark in brand colours
bottom right, over a soft oval of cream (`#fefcf9`, the card background) so the
logo sits in light rather than on a panel. Same treatment as the Lateral
Workshop tile, so the two invited-participant tiles read as a pair.

## Source photo caveat

The source (`IMG_6020.jpg`, 8000x5336) **arrived truncated at exactly 15 MiB** —
only the top 2985 rows contain scan data, the rest decodes as flat grey. Every
crop here is therefore taken from that intact upper strip, which is why they are
all facade detail rather than the full building. If the complete photo is
re-supplied, re-run `make_tiles.py` with a lower crop for a wider shot.

## The candidates (all 1200x675, ~125–205 KB)

- `A-logo-br-feathered.jpg` — **live tile.** Colour logo bottom right on a soft cream oval
- `B-logo-bl-feathered.jpg` — as A, mirrored to the bottom left
- `C-cream-band.jpg` — cream band across the bottom quarter, logo seated in it
- `D-split.jpg` — cream panel left, photo right, soft vertical seam
- `E-white-scrim.jpg` — white logo bottom right over a dark gradient; the pale
  brick fights it, kept only for completeness
- `F-panel-br.jpg` — crisp rounded cream panel bottom right (the Lateral C1 treatment)
- `G-panel-tight.jpg` — as F, on a tighter crop that makes the arched gable the subject

## Regenerating

```bash
python3 make_tiles.py ~/dev/IMG_6020.jpg
```

Needs Pillow. The logo files here (`successif_logo.png`, `successif_logo_white.png`)
come from successif.org. Nothing in this folder is served by the site.
