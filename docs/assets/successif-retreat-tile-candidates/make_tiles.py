#!/usr/bin/env python3
"""Build 16:9 tile candidates for the Successif Women's Retreat project tile.

Source photo is Jess's shot of Pendley Manor (the retreat venue). Its upload was
cut off at exactly 15 MiB, so only the top 2985 of 5336 rows decode — every crop
here is taken from that intact strip.

Needs Pillow. Run from this folder with the source photo path as argv[1]
(default ~/dev/IMG_6020.jpg). Nothing in this folder is served by the site.
"""
import sys
from PIL import Image, ImageFile, ImageOps, ImageDraw, ImageFilter, ImageEnhance

ImageFile.LOAD_TRUNCATED_IMAGES = True  # the source upload is truncated

SRC = sys.argv[1] if len(sys.argv) > 1 else '/home/ubuntu/dev/IMG_6020.jpg'
USABLE_H = 2985          # last row of intact scan data
TILE = (1200, 675)       # matches lateral-workshop-2026.jpg
S = 2                    # supersample factor
W, H = TILE[0] * S, TILE[1] * S
CREAM = (254, 252, 249)  # --color-bg-top / .project-card hover background

LOGO_COLOUR = 'successif_logo.png'
LOGO_WHITE = 'successif_logo_white.png'


def base_photo():
    """The chosen 16:9 window: arched gable, roofline and a sliver of sky."""
    src = ImageOps.exif_transpose(Image.open(SRC)).convert('RGB')
    crop = src.crop((2693, 0, 2693 + 5307, USABLE_H))
    return crop.resize((W, H), Image.LANCZOS)


def softened(img, brightness=1.06, saturation=0.92):
    img = ImageEnhance.Brightness(img).enhance(brightness)
    return ImageEnhance.Color(img).enhance(saturation)


def logo(path, width):
    lg = Image.open(path).convert('RGBA')
    return lg.resize((width, round(width * lg.size[1] / lg.size[0])), Image.LANCZOS)


def feathered_wash(size, box, blur, strength=255):
    """A blurred white wash confined to `box`, used as a paste mask."""
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).rectangle(box, fill=strength)
    return mask.filter(ImageFilter.GaussianBlur(blur))


def elliptical_wash(size, logo_box, pad):
    """A soft oval of cream centred on the logo — smoother than a blurred rect,
    so it reads as light falling on the wall rather than a patch of fog."""
    x0, y0, x1, y1 = logo_box
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).ellipse(
        (x0 - pad * 1.9, y0 - pad * 1.5, x1 + pad * 1.9, y1 + pad * 1.5), fill=250
    )
    return mask.filter(ImageFilter.GaussianBlur(pad * 1.5))


def paste_logo(img, lg, xy):
    img.paste(lg, xy, lg)


# ---------------------------------------------------------------- candidates

def A_logo_br_feathered(photo):
    """House style (as the Lateral C8 tile): colour logo bottom right over a very
    soft white underlay that runs into the cream card edge."""
    img = softened(photo.copy())
    lg = logo(LOGO_COLOUR, round(W * 0.30))
    pad = round(W * 0.045)
    x, y = W - lg.size[0] - pad, H - lg.size[1] - pad
    img.paste(Image.new('RGB', img.size, CREAM), (0, 0),
              elliptical_wash(img.size, (x, y, x + lg.size[0], y + lg.size[1]), pad))
    paste_logo(img, lg, (x, y))
    return img


def B_logo_bl_feathered(photo):
    """As A, mirrored to the bottom left."""
    img = softened(photo.copy())
    lg = logo(LOGO_COLOUR, round(W * 0.30))
    pad = round(W * 0.045)
    x, y = pad, H - lg.size[1] - pad
    img.paste(Image.new('RGB', img.size, CREAM), (0, 0),
              elliptical_wash(img.size, (x, y, x + lg.size[0], y + lg.size[1]), pad))
    paste_logo(img, lg, (x, y))
    return img


def C_cream_band(photo):
    """A cream band across the bottom, soft-edged at the top, logo sitting in it.
    The band colour is the card background, so the tile melts into the card."""
    img = softened(photo.copy())
    band_top = round(H * 0.76)
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).rectangle((0, band_top, W, H), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(round(H * 0.045)))
    img.paste(Image.new('RGB', img.size, CREAM), (0, 0), mask)
    lg = logo(LOGO_COLOUR, round(W * 0.31))
    band_mid = band_top + (H - band_top) // 2
    paste_logo(img, lg, (round(W * 0.055), band_mid - lg.size[1] // 2 + round(H * 0.02)))
    return img


def D_split(photo):
    """Cream panel left, photo right, soft vertical seam — logo owns the panel."""
    img = softened(photo.copy())
    # push the photo right so the gable stays in the visible half
    seam = round(W * 0.46)
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).rectangle((0, 0, seam, H), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(round(W * 0.018)))
    img.paste(Image.new('RGB', img.size, CREAM), (0, 0), mask)
    lg = logo(LOGO_COLOUR, round(W * 0.35))
    paste_logo(img, lg, (round(W * 0.05), H // 2 - lg.size[1] // 2))
    return img


def E_white_scrim(photo):
    """White logo bottom right over a soft dark gradient scrim — keeps the brick."""
    img = photo.copy()
    scrim = Image.new('L', img.size, 0)
    d = ImageDraw.Draw(scrim)
    for i in range(H):
        t = max(0.0, (i - H * 0.42) / (H * 0.58))
        d.line((0, i, W, i), fill=int(215 * t ** 1.35))
    img.paste(Image.new('RGB', img.size, (18, 22, 28)), (0, 0), scrim)
    lg = logo(LOGO_WHITE, round(W * 0.28))
    pad = round(W * 0.05)
    paste_logo(img, lg, (W - lg.size[0] - pad, H - lg.size[1] - pad))
    return img


def F_panel_br(photo):
    """Crisp rounded cream panel bottom right (the Lateral C1 treatment)."""
    img = softened(photo.copy())
    lg = logo(LOGO_COLOUR, round(W * 0.28))
    pad = round(W * 0.04)
    inset = round(W * 0.028)
    pw, ph = lg.size[0] + inset * 2, lg.size[1] + inset * 2
    px, py = W - pw - pad, H - ph - pad
    panel = Image.new('RGBA', (pw, ph), (0, 0, 0, 0))
    ImageDraw.Draw(panel).rounded_rectangle(
        (0, 0, pw - 1, ph - 1), radius=round(ph * 0.22), fill=CREAM + (242,)
    )
    img.paste(panel, (px, py), panel)
    paste_logo(img, lg, (px + inset, py + inset))
    return img


def G_panel_tight(_photo):
    """F's panel, but on a tighter crop that makes the arched gable the subject."""
    src = ImageOps.exif_transpose(Image.open(SRC)).convert('RGB')
    tight = src.crop((3400, 0, 3400 + 4000, 2250)).resize((W, H), Image.LANCZOS)
    return F_panel_br(tight)


CANDIDATES = [A_logo_br_feathered, B_logo_bl_feathered, C_cream_band,
              D_split, E_white_scrim, F_panel_br, G_panel_tight]

if __name__ == '__main__':
    photo = base_photo()
    made = []
    for fn in CANDIDATES:
        name = fn.__name__.replace('_', '-', 1).replace('_', '-')
        out = fn(photo).resize(TILE, Image.LANCZOS)
        path = f'{name}.jpg'
        out.save(path, quality=82, optimize=True, progressive=True)
        made.append(path)
        print('wrote', path)
    print('\n'.join(made))
