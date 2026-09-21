#!/usr/bin/env python3
"""Build 16:9 tile candidates for the Successif Women's Retreat project tile.

Source is Jess's cohort photo (`IMG_6020.jpg`, 8000x5336): the retreat group
outside Pendley Manor. The subject is the group, so every candidate keeps the
whole row of people in frame and puts the Successif wordmark somewhere that
covers nobody — the tarmac foreground, or a cream strip below the photo.

Needs Pillow. Run from this folder with the source photo path as argv[1]
(default ~/dev/IMG_6020.jpg). Nothing in this folder is served by the site.
"""
import sys
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

SRC = sys.argv[1] if len(sys.argv) > 1 else '/home/ubuntu/dev/IMG_6020.jpg'

TILE = (1200, 675)       # matches the other tiles
S = 2                    # supersample, downscaled at the end
W, H = TILE[0] * S, TILE[1] * S
CREAM = (254, 252, 249)  # --color-bg-top / .project-card hover background

# The group spans x 1169-6892, heads at y 3477, feet and shadows ending at
# y 4720.
#
# Full frame width — the widest a 16:9 window of this photo can be, so this is
# as far out as it zooms without letterboxing. At this scale the faces are a
# few pixels across at the size a tile renders.
#
# The bottom sits at y 5120, which leaves a 60px band of tarmac on the finished
# tile: about half what the previous framing had, and the least that still fits
# the wordmark underneath the group without touching anyone.
GROUP_16_9 = (0, 620, 8000, 5120)
# The variants that pair the photo with a cream strip carry the logo outside
# the image, so they can cut at y 4830 — just under the feet, no tarmac at all.
GROUP_PANORAMA = (0, 330, 8000, 4830)

LOGO_COLOUR = 'successif_logo.png'
LOGO_WHITE = 'successif_logo_white.png'


def source():
    return ImageOps.exif_transpose(Image.open(SRC)).convert('RGB')


def base_photo():
    return source().crop(GROUP_16_9).resize((W, H), Image.LANCZOS)


def softened(img, brightness=1.03, saturation=0.96):
    """A light touch only — faces should not go waxy."""
    img = ImageEnhance.Brightness(img).enhance(brightness)
    return ImageEnhance.Color(img).enhance(saturation)


def logo(path, width):
    lg = Image.open(path).convert('RGBA')
    return lg.resize((width, round(width * lg.size[1] / lg.size[0])), Image.LANCZOS)


def elliptical_wash(size, logo_box, pad, strength=250, inboard=0.6):
    """A soft oval of cream centred on the logo, so it reads as light on the
    ground rather than a patch of fog. `inboard` tightens the edge that faces
    into the frame, keeping the glow off whoever is standing nearest to it."""
    x0, y0, x1, y1 = logo_box
    lead = pad * inboard if x0 > size[0] / 2 else pad * 1.9
    trail = pad * 1.9 if x0 > size[0] / 2 else pad * inboard
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).ellipse(
        (x0 - lead, y0 - pad * 1.3, x1 + trail, y1 + pad * 1.6), fill=strength
    )
    return mask.filter(ImageFilter.GaussianBlur(pad * 1.35))


def paste_logo(img, lg, xy):
    img.paste(lg, (round(xy[0]), round(xy[1])), lg)


def with_cream_strip(strip_fraction, logo_width, align='left'):
    """Photo on top, a strip of card-coloured cream beneath holding the logo.
    Covers nobody, and the strip colour means the tile melts into the card."""
    strip_h = round(H * strip_fraction)
    photo_h = H - strip_h
    photo = source().crop(GROUP_PANORAMA)
    photo = softened(photo.resize((W, photo_h), Image.LANCZOS))

    img = Image.new('RGB', (W, H), CREAM)
    img.paste(photo, (0, 0))

    lg = logo(LOGO_COLOUR, round(W * logo_width))
    pad = round(W * 0.045)
    x = pad if align == 'left' else W - lg.size[0] - pad
    paste_logo(img, lg, (x, photo_h + (strip_h - lg.size[1]) // 2))
    return img


# ---------------------------------------------------------------- candidates

def A_logo_br_on_tarmac(photo):
    """House style, as the Lateral tile: colour wordmark over a soft cream
    glow. Sits on the tarmac below the group, clear of everyone's feet."""
    img = softened(photo.copy())
    lg = logo(LOGO_COLOUR, round(W * 0.165))
    pad = round(W * 0.014)
    x, y = W - lg.size[0] - pad * 1.6, H - lg.size[1] - pad
    img.paste(Image.new('RGB', img.size, CREAM), (0, 0),
              elliptical_wash(img.size, (x, y, x + lg.size[0], y + lg.size[1]), pad))
    paste_logo(img, lg, (x, y))
    return img


def B_logo_bl_on_tarmac(photo):
    """As A, mirrored to the bottom left."""
    img = softened(photo.copy())
    lg = logo(LOGO_COLOUR, round(W * 0.165))
    pad = round(W * 0.014)
    x, y = pad * 1.6, H - lg.size[1] - pad
    img.paste(Image.new('RGB', img.size, CREAM), (0, 0),
              elliptical_wash(img.size, (x, y, x + lg.size[0], y + lg.size[1]), pad))
    paste_logo(img, lg, (x, y))
    return img


def C_cream_strip(_photo):
    """Panorama of the group above a cream strip carrying the logo."""
    return with_cream_strip(0.13, 0.21, align='left')


def D_cream_strip_right(_photo):
    """As C, logo right-aligned."""
    return with_cream_strip(0.13, 0.21, align='right')


def E_panel_br(photo):
    """Crisp rounded cream panel on the tarmac, bottom right."""
    img = softened(photo.copy())
    lg = logo(LOGO_COLOUR, round(W * 0.155))
    pad = round(W * 0.012)
    inset = round(W * 0.012)
    pw, ph = lg.size[0] + inset * 2, lg.size[1] + inset * 2
    px, py = W - pw - pad, H - ph - pad
    panel = Image.new('RGBA', (pw, ph), (0, 0, 0, 0))
    ImageDraw.Draw(panel).rounded_rectangle(
        (0, 0, pw - 1, ph - 1), radius=round(ph * 0.24), fill=CREAM + (240,)
    )
    img.paste(panel, (px, py), panel)
    paste_logo(img, lg, (px + inset, py + inset))
    return img


def F_white_on_tarmac(photo):
    """White wordmark straight onto the tarmac, which is dark and even enough
    to carry it without any scrim at all."""
    img = softened(photo.copy())
    lg = logo(LOGO_WHITE, round(W * 0.165))
    pad = round(W * 0.014)
    paste_logo(img, lg, (W - lg.size[0] - pad * 1.6, H - lg.size[1] - pad))
    return img


def G_closer(_photo):
    """A's treatment on a closer window: bigger group, less manor."""
    photo = source().crop((820, 1725, 7240, 5336)).resize((W, H), Image.LANCZOS)
    return A_logo_br_on_tarmac(photo)


CANDIDATES = [A_logo_br_on_tarmac, B_logo_bl_on_tarmac, C_cream_strip,
              D_cream_strip_right, E_panel_br, F_white_on_tarmac, G_closer]

if __name__ == '__main__':
    photo = base_photo()
    for fn in CANDIDATES:
        letter, rest = fn.__name__.split('_', 1)
        path = f'{letter}-{rest.replace("_", "-")}.jpg'
        fn(photo).resize(TILE, Image.LANCZOS).save(
            path, quality=82, optimize=True, progressive=True)
        print('wrote', path)
