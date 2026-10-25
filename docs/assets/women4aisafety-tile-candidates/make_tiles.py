#!/usr/bin/env python3
"""Build the Women4AISafety tile candidates from the LinkedIn post graphic.

usage: uv run --with pillow python -I make_tiles.py <screenshot.png>

The screenshot is the 1142x1432 LinkedIn post; GRAPHIC is the event graphic
inside it. Every candidate is 1200x675 and capped at 150 KB. The live tile is
written to public/images/women4aisafety-2026.jpg.
"""
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
OUT_W, OUT_H = 1200, 675
CREAM = (254, 252, 249)  # the card background
SIZE_CAP = 150_000
GRAPHIC = (0, 277, 1111, 1390)  # (x0, y0, x1, y1) of the graphic in the screenshot
LIVE = "A-split-logo-right.jpg"


def save_capped(img, path, cap=SIZE_CAP):
    q = 88
    for q in range(88, 50, -2):
        img.save(path, "JPEG", quality=q, optimize=True, progressive=True)
        if path.stat().st_size <= cap:
            break
    print(f"{path.name}: {path.stat().st_size // 1000} KB at quality {q}")


def fit(img, box_w, box_h):
    r = min(box_w / img.width, box_h / img.height)
    return img.resize((round(img.width * r), round(img.height * r)), Image.LANCZOS)


def canvas():
    return Image.new("RGB", (OUT_W, OUT_H), CREAM)


def split(graphic, logo, logo_left=False):
    """The square graphic on one side, the W4AIS wordmark on cream on the other."""
    g = fit(graphic, OUT_W, OUT_H)
    c = canvas()
    c.paste(g, (OUT_W - g.width if logo_left else 0, 0))
    panel_x0 = 0 if logo_left else g.width
    panel_w = OUT_W - g.width
    l = fit(logo, int(panel_w * 0.72), int(OUT_H * 0.5))
    c.paste(l, (panel_x0 + (panel_w - l.width) // 2, (OUT_H - l.height) // 2), l)
    return c


def pillarbox(graphic):
    g = fit(graphic, OUT_W, OUT_H)
    c = canvas()
    c.paste(g, ((OUT_W - g.width) // 2, 0))
    return c


def main():
    shot = Image.open(sys.argv[1]).convert("RGB")
    graphic = shot.crop(GRAPHIC)
    logo = Image.open(HERE / "w4ais_logo.png").convert("RGBA")
    out = {
        "A-split-logo-right.jpg": split(graphic, logo),
        "B-split-logo-left.jpg": split(graphic, logo, logo_left=True),
        "C-pillarbox.jpg": pillarbox(graphic),
    }
    for name, img in out.items():
        save_capped(img, HERE / name)
    save_capped(out[LIVE], HERE.parents[2] / "public/images/women4aisafety-2026.jpg")


if __name__ == "__main__":
    main()
