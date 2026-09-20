"""C8: coloured logos (BlueDot #1144cc), bottom right; very soft white underlay that fades to pure white at the bottom edge.
Usage: uv run --no-project --with pillow python make_logo_tiles_v4.py
"""
from PIL import Image, ImageDraw, ImageFilter, ImageChops
from pathlib import Path
HERE = Path(__file__).parent
base = Image.open(HERE.parent / "C-site-og-image.png").convert("RGBA")
W, H = base.size

# Lift the baked-in text block (wordmark, tagline, date line) up by TEXT_LIFT px.
# The block sits on soft haze, so a feathered shifted copy blends without a seam.
TEXT_LIFT = 10
def lift_text(im, box=(700, 130, 1200, 596), feather=10):
    """Composite a copy of `im` shifted up by TEXT_LIFT inside `box`, with feathered edges."""
    x0, y0, x1, y1 = box
    rgb = im.convert("RGB")
    shifted = rgb.copy()
    shifted.paste(rgb.crop((x0, y0 + TEXT_LIFT, x1, min(y1 + TEXT_LIFT, rgb.height))), (x0, y0))
    m = Image.new("L", rgb.size, 0)
    ImageDraw.Draw(m).rectangle((x0 + feather, y0 + feather, x1, y1 - feather), fill=255)
    m = m.filter(ImageFilter.GaussianBlur(feather))
    return Image.composite(shifted, rgb, m).convert("RGBA")
base = lift_text(base)

def logo(name, h):
    im = Image.open(HERE / name).convert("RGBA"); im = im.crop(im.getbbox())
    return im.resize((int(im.width * h / im.height), h), Image.LANCZOS)

def render(underlay_alpha=150, blur=48, bottom_blur=36, out="C8.png"):
    im = base.copy()
    logos = [logo("kairos.png", 34), logo("bluedot_blue.png", 30), logo("constellation.png", 32)]
    gap, right, cy = 34, 1172, 610
    total = sum(l.width for l in logos) + gap * (len(logos) - 1)
    x0 = right - total
    pad = 90
    # work on a taller canvas so the blur can run off the bottom edge
    ext = 200
    big = (W, H + ext)
    # layer A: soft, semi-transparent underlay around the logo row
    a = Image.new("L", big, 0)
    ImageDraw.Draw(a).rounded_rectangle((x0 - pad, cy - 22 - 50, right + pad, H + ext), 60, fill=underlay_alpha)
    a = a.filter(ImageFilter.GaussianBlur(blur))
    # layer B: pure white band at the bottom, feathered upwards and at the sides
    b = Image.new("L", big, 0)
    ImageDraw.Draw(b).rectangle((x0 - pad + 20, H - 28, right + pad - 20, H + ext), fill=255)
    b = b.filter(ImageFilter.GaussianBlur(bottom_blur))
    mask = ImageChops.lighter(a, b).crop((0, 0, W, H))
    white = Image.new("RGBA", (W, H), (255, 255, 255, 255)); white.putalpha(mask)
    im = Image.alpha_composite(im, white)
    x = x0
    for l in logos:
        im.alpha_composite(l, (x, cy + 10 - l.height // 2)); x += l.width + gap  # logos sit 10px below the underlay centre
    im.convert("RGB").save(HERE / out, optimize=True)

render(out="C8-blue-fade-to-white.png")
print("done")
