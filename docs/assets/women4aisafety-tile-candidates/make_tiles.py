#!/usr/bin/env python3
"""Build the Women4AISafety tile candidates from the LinkedIn post graphic.

usage: uv run --with pillow python -I make_tiles.py <screenshot.png>

The screenshot is the 1142x1432 LinkedIn post; GRAPHIC is the square event
graphic inside it. The tile is 16:9, so the graphic's speckled gradient
background is extended: sideways from content-free slivers at the left and
right edges (keeping the top-bottom gradient), and above and below from
content-free bands at the top and just under the date line (keeping the
left-right gradient). Every added pixel is a random pixel from the relevant
sliver/band within JITTER rows or columns of its own position, which keeps the
gradient and speckle continuous without seams or banding.

Variant A (live) drops the purple base strip and gives the content equal
background margins of GAP rows above the portrait ring and below the date line.
Variant B keeps the strip, with STRIP_GAP extra rows of background above it.
Every candidate is 1200x675 and capped at 150 KB. The live tile is written to
public/images/women4aisafety-2026.jpg.
"""
import random
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
OUT_W, OUT_H = 1200, 675
SIZE_CAP = 150_000
GRAPHIC = (0, 277, 1109, 1390)  # (x0, y0, x1, y1) of the graphic in the screenshot (1109+ is page border)
RIGHT_SLIVER = (1080, 1108)  # content-free columns at the graphic's right edge
LEFT_SLIVER_MAX = 28
JITTER = 14  # rows/columns either side a sampled pixel may come from
GAP = 52  # variant A: background rows above the ring and below the date line
STRIP_GAP = 14  # variant B: extra background rows between the date line and the strip
LIVE = "A-no-strip.jpg"


def save_capped(img, path, cap=SIZE_CAP):
    q = 88
    for q in range(88, 50, -2):
        img.save(path, "JPEG", quality=q, optimize=True, progressive=True)
        if path.stat().st_size <= cap:
            break
    print(f"{path.name}: {path.stat().st_size // 1000} KB at quality {q}")


def luminance(p):
    return (p[0] * 299 + p[1] * 587 + p[2] * 114) // 1000


def is_ring(p):
    r, g, b = p
    return b > 150 and r < 100 and b > g + 30


def ring_bounds(graphic, run=6):
    """(top row, leftmost column) of the portrait ring: runs of saturated blue."""
    px = graphic.load()
    top, left = None, graphic.width
    for y in range(0, 600):
        n = 0
        for x in range(0, 560):
            n = n + 1 if is_ring(px[x, y]) else 0
            if n >= run:
                top = y if top is None else top
                left = min(left, x - run + 1)
                break
    return top, left


def strip_top(graphic, max_rows=80, tol=48):
    """First row of the solid purple strip at the bottom (rows above it are speckled)."""
    px = graphic.load()
    w, h = graphic.size
    for y in range(h - 1, h - max_rows, -1):
        lums = [luminance(px[x, y]) for x in range(0, w, 7)]
        if max(lums) - min(lums) > tol:
            return y + 1
    return h - max_rows


def text_bottom_row(graphic, strip_y, run=3):
    """Last row above the strip that still holds white text (the date line)."""
    px = graphic.load()
    for y in range(strip_y - 1, strip_y - 200, -1):
        n = 0
        for x in range(graphic.width):
            n = n + 1 if luminance(px[x, y]) > 235 else 0
            if n >= run:
                return y
    return strip_y - 1


def band_fill(graphic, band, width, height, rng):
    """width x height patch: pixel (x, y) is a random pixel from rows `band` near column x."""
    if height <= 0:
        return None
    src = graphic.load()
    out = Image.new("RGB", (width, height))
    dst = out.load()
    y0, y1 = band
    w = graphic.width
    for y in range(height):
        for x in range(width):
            sx = min(max(x + rng.randint(-JITTER, JITTER), 0), w - 1)
            dst[x, y] = src[sx, rng.randrange(y0, y1)]
    return out


def side_fill(graphic, sliver, width, rng, strip_y=None):
    """width x H patch: pixel (x, y) is a random pixel from columns `sliver` near row y."""
    src = graphic.load()
    h = graphic.height
    out = Image.new("RGB", (width, h))
    dst = out.load()
    x0, x1 = sliver
    for y in range(h):
        lo, hi = 0, h - 1
        if strip_y is not None:
            lo, hi = (0, strip_y - 1) if y < strip_y else (strip_y, h - 1)
        for x in range(width):
            sy = min(max(y + rng.randint(-JITTER, JITTER), lo), hi)
            dst[x, y] = src[rng.randrange(x0, x1), sy]
    return out


def compose(parts, left_sliver, rng, strip_h=0):
    """Stack `parts` vertically, extend sideways to 16:9, resize to the tile size."""
    parts = [p for p in parts if p is not None]
    h = sum(p.height for p in parts)
    g = Image.new("RGB", (parts[0].width, h))
    y = 0
    for p in parts:
        g.paste(p, (0, y))
        y += p.height
    strip_y = h - strip_h if strip_h else None
    extra = round(h * OUT_W / OUT_H) - g.width
    left_w, right_w = extra // 2, extra - extra // 2
    c = Image.new("RGB", (g.width + extra, h))
    c.paste(side_fill(g, left_sliver, left_w, rng, strip_y), (0, 0))
    c.paste(g, (left_w, 0))
    c.paste(side_fill(g, RIGHT_SLIVER, right_w, rng, strip_y), (left_w + g.width, 0))
    return c.resize((OUT_W, OUT_H), Image.LANCZOS)


def main():
    shot = Image.open(sys.argv[1]).convert("RGB")
    g = shot.crop(GRAPHIC)
    w, h = g.size
    rng = random.Random(4)
    strip_y = strip_top(g)
    text_y = text_bottom_row(g, strip_y)
    ring_top, ring_left = ring_bounds(g)
    left_sliver = (0, max(4, min(ring_left - 4, LEFT_SLIVER_MAX)))
    top_band = (0, max(4, ring_top - 4))
    bottom_band = (text_y + 2, strip_y)
    body = g.crop((0, 0, w, strip_y))
    strip = g.crop((0, strip_y, w, h))
    print(f"ring top={ring_top} left={ring_left}; date line ends row {text_y}; strip from row {strip_y}")

    def build(gap, keep_strip):
        top = band_fill(g, top_band, w, gap - ring_top, rng)
        bottom = band_fill(g, bottom_band, w, gap - (strip_y - text_y), rng)
        parts = [top, body, bottom] + ([strip] if keep_strip else [])
        return compose(parts, left_sliver, rng, strip.height if keep_strip else 0)

    out = {
        "A-no-strip.jpg": build(GAP, keep_strip=False),
        "B-strip-spaced.jpg": build(strip_y - text_y + STRIP_GAP, keep_strip=True),
    }
    for name, img in out.items():
        save_capped(img, HERE / name)
    save_capped(out[LIVE], HERE.parents[2] / "public/images/women4aisafety-2026.jpg")


if __name__ == "__main__":
    main()
