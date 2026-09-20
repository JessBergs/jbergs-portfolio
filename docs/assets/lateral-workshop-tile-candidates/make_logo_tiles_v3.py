"""C7: coloured logos (BlueDot in button blue #1144cc), bottom right, wider feathered white glow.
Usage: uv run --no-project --with pillow python make_logo_tiles_v3.py
"""
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path
HERE = Path(__file__).parent
base = Image.open(HERE.parent / "C-site-og-image.png").convert("RGBA")

def logo(name, h):
    im = Image.open(HERE / name).convert("RGBA"); im = im.crop(im.getbbox())
    return im.resize((int(im.width * h / im.height), h), Image.LANCZOS)

def row(im, right, cy, glow_alpha, blur, pad_x, pad_y):
    logos = [logo("kairos.png", 34), logo("bluedot_blue.png", 30), logo("constellation.png", 32)]
    gap = 34
    total = sum(l.width for l in logos) + gap * (len(logos) - 1)
    x0 = right - total
    ov = Image.new("RGBA", im.size, (255, 255, 255, 0))
    d = ImageDraw.Draw(ov)
    d.rounded_rectangle((x0 - pad_x, cy - 22 - pad_y, right + pad_x, cy + 22 + pad_y), 40, fill=(255, 255, 255, glow_alpha))
    ov = ov.filter(ImageFilter.GaussianBlur(blur))
    im = Image.alpha_composite(im, ov)
    x = x0
    for l in logos:
        im.alpha_composite(l, (x, cy - l.height // 2)); x += l.width + gap
    return im

row(base.copy(), 1172, 610, 215, 34, 60, 40).convert("RGB").save(HERE / "C7-blue-more-feathered.png", optimize=True)
print("done")
