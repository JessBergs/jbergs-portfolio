#!/usr/bin/env python3
"""Build the Women4AISafety tile candidates from the LinkedIn post graphic.

usage: uv run --with pillow python -I make_tiles.py <screenshot.png>

The screenshot is the 1142x1432 LinkedIn post; GRAPHIC is the square event
graphic inside it. The tile is 16:9, so the graphic's speckled gradient
background and purple base strip are extended sideways: each extra pixel is a
copy of a random pixel from a content-free sliver at the nearest edge of the
graphic, taken from a nearby row (within JITTER rows, never across the strip
edge). That keeps the gradient, the speckle and the strip continuous without a
visible seam, and without the row banding that pure per-column copying gives.
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
JITTER = 14  # rows either side a sampled pixel may come from
LIVE = "A-extended-centred.jpg"


def save_capped(img, path, cap=SIZE_CAP):
    q = 88
    for q in range(88, 50, -2):
        img.save(path, "JPEG", quality=q, optimize=True, progressive=True)
        if path.stat().st_size <= cap:
            break
    print(f"{path.name}: {path.stat().st_size // 1000} KB at quality {q}")


def luminance(p):
    return (p[0] * 299 + p[1] * 587 + p[2] * 114) // 1000


def ring_left_edge(graphic, y0=0, y1=600, run=6):
    """Leftmost x of the portrait ring (a run of saturated blue) in rows y0..y1."""
    px = graphic.load()
    best = graphic.width
    for y in range(y0, y1):
        n = 0
        for x in range(0, 80):
            r, g, b = px[x, y]
            n = n + 1 if (b > 150 and r < 100 and b > g + 30) else 0
            if n >= run:
                best = min(best, x - run + 1)
                break
    return best


def strip_top(graphic, max_rows=80, tol=12):
    """First row of the solid purple strip at the bottom (rows above it are speckled)."""
    px = graphic.load()
    w, h = graphic.size
    for y in range(h - 1, h - max_rows, -1):
        lums = [luminance(px[x, y]) for x in range(0, w, 7)]
        if max(lums) - min(lums) > tol * 4:
            return y + 1
    return h - max_rows


def extend(graphic, sliver, width, rng, strip_y):
    """A `width`-wide strip of pixels sampled from the sliver's columns and nearby rows."""
    src = graphic.load()
    h = graphic.height
    out = Image.new("RGB", (width, h))
    dst = out.load()
    x0, x1 = sliver
    for y in range(h):
        lo, hi = (0, strip_y - 1) if y < strip_y else (strip_y, h - 1)
        for x in range(width):
            sy = min(max(y + rng.randint(-JITTER, JITTER), lo), hi)
            dst[x, y] = src[rng.randrange(x0, x1), sy]
    return out


def extended(graphic, left_w, right_w, left_sliver, rng, strip_y):
    """The graphic with its background continued `left_w` / `right_w` columns sideways."""
    c = Image.new("RGB", (graphic.width + left_w + right_w, graphic.height))
    if left_w:
        c.paste(extend(graphic, left_sliver, left_w, rng, strip_y), (0, 0))
    c.paste(graphic, (left_w, 0))
    if right_w:
        c.paste(extend(graphic, RIGHT_SLIVER, right_w, rng, strip_y), (left_w + graphic.width, 0))
    return c.resize((OUT_W, OUT_H), Image.LANCZOS)


def main():
    shot = Image.open(sys.argv[1]).convert("RGB")
    graphic = shot.crop(GRAPHIC)
    rng = random.Random(4)
    total_w = round(graphic.height * OUT_W / OUT_H)
    extra = total_w - graphic.width
    ring_x = ring_left_edge(graphic)
    left_sliver = (0, max(4, min(ring_x - 4, 28)))
    strip_y = strip_top(graphic)
    print(f"ring left edge x={ring_x}; left sliver {left_sliver}; strip from row {strip_y}; extension {extra} px")
    out = {
        "A-extended-centred.jpg": extended(graphic, extra // 2, extra - extra // 2, left_sliver, rng, strip_y),
        "B-extended-left.jpg": extended(graphic, 0, extra, left_sliver, rng, strip_y),
    }
    for name, img in out.items():
        save_capped(img, HERE / name)
    save_capped(out[LIVE], HERE.parents[2] / "public/images/women4aisafety-2026.jpg")


if __name__ == "__main__":
    main()
