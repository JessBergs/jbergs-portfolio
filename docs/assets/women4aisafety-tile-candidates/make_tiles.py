#!/usr/bin/env python3
"""Build the Women4AISafety tile candidates from the LinkedIn post graphic.

usage: uv run --with pillow python -I make_tiles.py <screenshot.png>

The screenshot is the 1142x1432 LinkedIn post; GRAPHIC is the square event
graphic inside it. The tile is 16:9, so the graphic's speckled gradient
background is extended: sideways from content-free columns at the left and
right edges (keeping the top-bottom gradient), and above and below from
content-free bands at the top and just under the date line (keeping the
left-right gradient). The fill copies PATCH x PATCH blocks rather than single
pixels, so the dither's local structure carries over; each block comes from
within JITTER rows (sides) or BAND_JITTER columns (bands) of its own position,
and side blocks come from at most SIDE_REACH columns inside the edge so their
colour matches the edge. Content-free spans are found per row by scanning for
text, ring and badge pixels, which gives the fill far more source material than
the thin strip beside the portrait ring alone.

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
RIGHT_SLIVER = (1080, 1108)  # fallback content-free columns at the right edge (beside "BlueDot Impact")
LEFT_SLIVER_MAX = 28
PATCH = 12  # the fill copies PATCH x PATCH blocks, which keeps the dither's local structure
JITTER = 14  # rows a side-fill block may be taken from, either side of its own row
BAND_JITTER = 60  # columns a top/bottom-fill block may be taken from, either side of its own column
SIDE_REACH = 60  # how far inside an edge a side-fill block may come from
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


def is_content(p):
    """White text, ring/date-box blue, or badge red, as opposed to the speckled background."""
    r, g, b = p
    return luminance(p) > 225 or (b > 150 and r < 110) or (r > 190 and g < 90 and b < 90)


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


def free_spans(img, margin=6, run=3):
    """Per row, (left, right): columns [0, left) and [right, W) hold no content run."""
    px = img.load()
    w, h = img.size
    lefts, rights = [], []
    for y in range(h):
        n, lf = 0, w
        for x in range(w):
            n = n + 1 if is_content(px[x, y]) else 0
            if n >= run:
                lf = x - run + 1
                break
        n, rf = 0, 0
        for x in range(w - 1, -1, -1):
            n = n + 1 if is_content(px[x, y]) else 0
            if n >= run:
                rf = x + run
                break
        lefts.append(max(0, lf - margin))
        rights.append(min(w, rf + margin))
    return lefts, rights


def band_fill(graphic, band, width, height, rng):
    """width x height fill made of blocks copied from rows `band`, each from near its own column."""
    if height <= 0:
        return None
    out = Image.new("RGB", (width, height))
    y0, y1 = band
    ph = min(PATCH, y1 - y0)
    w = graphic.width
    for y in range(0, height, ph):
        bh = min(ph, height - y)
        for x in range(0, width, PATCH):
            bw = min(PATCH, width - x)
            sx = min(max(x + rng.randint(-BAND_JITTER, BAND_JITTER), 0), w - bw)
            sy = rng.randint(y0, y1 - bh)
            out.paste(graphic.crop((sx, sy, sx + bw, sy + bh)), (x, y))
    return out


def side_fill(img, side, width, rng, spans, left_sliver, strip_y=None):
    """width x H fill of blocks copied from content-free columns at `side`, each from near its own row."""
    w, h = img.size
    out = Image.new("RGB", (width, h))
    lefts, rights = spans
    for y in range(0, h, PATCH):
        bh = min(PATCH, h - y)
        lo, hi = 0, h - bh
        if strip_y is not None:
            if y + bh <= strip_y:
                hi = strip_y - bh
            elif y >= strip_y:
                lo = strip_y
            else:
                lo = hi = y  # block straddles the strip edge: copy it aligned
        for x in range(0, width, PATCH):
            bw = min(PATCH, width - x)
            sy = min(max(y + rng.randint(-JITTER, JITTER), lo), hi)
            if side == "left":
                lw = min(min(lefts[sy:sy + bh]), SIDE_REACH)
                if lw < bw:
                    lw = left_sliver[1]
                sx = rng.randint(0, lw - bw)
            else:
                rf = max(max(rights[sy:sy + bh]), w - SIDE_REACH)
                if w - rf < bw:
                    rf = RIGHT_SLIVER[0]
                sx = rng.randint(rf, w - bw)
            out.paste(img.crop((sx, sy, sx + bw, sy + bh)), (x, y))
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
    spans = free_spans(g)
    extra = round(h * OUT_W / OUT_H) - g.width
    left_w, right_w = extra // 2, extra - extra // 2
    c = Image.new("RGB", (g.width + extra, h))
    c.paste(side_fill(g, "left", left_w, rng, spans, left_sliver, strip_y), (0, 0))
    c.paste(g, (left_w, 0))
    c.paste(side_fill(g, "right", right_w, rng, spans, left_sliver, strip_y), (left_w + g.width, 0))
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
