"""Add Kairos / BlueDot / Constellation logos to tile variant C.
Usage: uv run --no-project --with pillow python make_logo_tiles.py
Base: ../C-site-og-image.png (1200x675). Logos: kairos.png, bluedot.png, constellation.png (rasterised).
"""
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path
HERE = Path(__file__).parent
PINE_DEEP = (42, 49, 53)
CREAM = (254, 252, 249)
base = Image.open(HERE.parent / "C-site-og-image.png").convert("RGBA")
W, H = base.size

def logo(name, h, mono):
    im = Image.open(HERE / name).convert("RGBA")
    im = im.crop(im.getbbox())
    im = im.resize((int(im.width * h / im.height), h), Image.LANCZOS)
    if mono:
        a = im.getchannel("A")
        im = Image.new("RGBA", im.size, PINE_DEEP + (0,)); im.putalpha(a)
    return im

def render(mono, panel, out):
    im = base.copy()
    logos = [logo("kairos.png", 34, mono), logo("bluedot.png", 30, mono), logo("constellation.png", 32, mono)]
    gap = 34
    total = sum(l.width for l in logos) + gap * (len(logos) - 1)
    right = 1172                     # wordmark right edge
    x0 = right - total
    cy = 610
    if panel:
        pad_x, pad_y = 22, 16
        ov = Image.new("RGBA", im.size, (0, 0, 0, 0))
        d = ImageDraw.Draw(ov)
        d.rounded_rectangle((x0 - pad_x, cy - 22 - pad_y, right + pad_x, cy + 22 + pad_y), 12, fill=CREAM + (215,))
        im = Image.alpha_composite(im, ov)
    x = x0
    for l in logos:
        im.alpha_composite(l, (x, cy - l.height // 2))
        x += l.width + gap
    im.convert("RGB").save(HERE / out, optimize=True)
    return im

render(mono=False, panel=True, out="C1-logos-colour-panel.png")
render(mono=True, panel=True, out="C2-logos-mono-panel.png")
render(mono=True, panel=False, out="C3-logos-mono-nopanel.png")
print("done")
