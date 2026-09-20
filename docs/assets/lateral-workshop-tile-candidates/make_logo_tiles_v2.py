"""Coloured partner logos on tile C with a feathered white glow, bottom or top placement.
Usage: uv run --no-project --with pillow python make_logo_tiles_v2.py
"""
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path
HERE = Path(__file__).parent
base = Image.open(HERE.parent / "C-site-og-image.png").convert("RGBA")

def logo(name, h):
    im = Image.open(HERE / name).convert("RGBA"); im = im.crop(im.getbbox())
    return im.resize((int(im.width * h / im.height), h), Image.LANCZOS)

def row(im, right, cy, glow_alpha, blur, pad_x=34, pad_y=26):
    logos = [logo("kairos.png", 34), logo("bluedot.png", 30), logo("constellation.png", 32)]
    gap = 34
    total = sum(l.width for l in logos) + gap * (len(logos) - 1)
    x0 = right - total
    if glow_alpha:
        ov = Image.new("RGBA", im.size, (255, 255, 255, 0))
        d = ImageDraw.Draw(ov)
        d.rounded_rectangle((x0 - pad_x, cy - 22 - pad_y, right + pad_x, cy + 22 + pad_y), 30, fill=(255, 255, 255, glow_alpha))
        ov = ov.filter(ImageFilter.GaussianBlur(blur))
        im = Image.alpha_composite(im, ov)
    x = x0
    for l in logos:
        im.alpha_composite(l, (x, cy - l.height // 2)); x += l.width + gap
    return im

def save(im, name): im.convert("RGB").save(HERE / name, optimize=True)

save(row(base.copy(), 1172, 610, 200, 18), "C4-colour-feathered-bottom.png")
save(row(base.copy(), 1172, 58, 0, 0), "C5-colour-top-noglow.png")
save(row(base.copy(), 1172, 58, 150, 18), "C6-colour-top-feathered.png")
print("done")
