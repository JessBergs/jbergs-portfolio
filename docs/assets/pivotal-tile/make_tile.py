#!/usr/bin/env python3
"""Build the Pivotal Research mentoring tile.

usage: uv run --with pillow python -I make_tile.py

Styled after the mentor profile page: Pivotal's Open Graph image as the
background (white centre, lavender pixel mosaic at the sides, scaled to 675 tall
and centre-cropped to 1200 wide), the "pivotal" wordmark lifted out of it and
re-placed, centred, above the role set in monospace: "Mentor:" and a boxed
"Q1 2027 AIS" tag as on the page, then the fellowship name. Text uses DejaVu
Sans Mono, the closest system font to the page's monospace. Output is 1200x675,
capped at 150 KB, written to public/images/pivotal-ais-fellowship-2027.jpg.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
OUT_W, OUT_H = 1200, 675
SIZE_CAP = 150_000
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
WORDMARK_W = 440
TAG_BORDER = (176, 160, 214)  # lavender, as the tag outline on the page
SIZE = 36


def save_capped(img, path, cap=SIZE_CAP):
    q = 92
    for q in range(92, 60, -2):
        img.save(path, "JPEG", quality=q, optimize=True, progressive=True)
        if path.stat().st_size <= cap:
            break
    print(f"{path.name}: {path.stat().st_size // 1000} KB at quality {q}")


def wordmark_box(og):
    """Bounding box of the dark wordmark pixels in the white centre of the og image."""
    px = og.load()
    xs, ys = [], []
    for y in range(og.height):
        for x in range(300, 900):
            if sum(px[x, y][:3]) < 300:
                xs.append(x)
                ys.append(y)
    return min(xs), min(ys), max(xs) + 1, max(ys) + 1


def main():
    og = Image.open(HERE / "pivotal-og-image.png").convert("RGB")

    # Lift the wordmark, then blank it out of the background.
    x0, y0, x1, y1 = wordmark_box(og)
    wordmark = og.crop((x0 - 4, y0 - 4, x1 + 4, y1 + 4))
    ink = min((og.getpixel((x, y)) for x in range(x0, x1) for y in range(y0, y1)), key=sum)  # darkest wordmark pixel
    ImageDraw.Draw(og).rectangle((x0 - 6, y0 - 6, x1 + 6, y1 + 6), fill=(255, 255, 255))

    # Background: scale to the tile height, crop the centre.
    r = OUT_H / og.height
    bg = og.resize((round(og.width * r), OUT_H), Image.LANCZOS)
    left = (bg.width - OUT_W) // 2
    tile = bg.crop((left, 0, left + OUT_W, OUT_H))

    # Centred block: wordmark, "Mentor: [Q1 2027 AIS]", fellowship name.
    wm = wordmark.resize((WORDMARK_W, round(wordmark.height * WORDMARK_W / wordmark.width)), Image.LANCZOS)
    font = ImageFont.truetype(MONO, SIZE)
    label, tag, line2 = "Mentor:", "Q1 2027 AIS", "AI Safety Fellowship"
    pad_x, pad_y = 16, 10
    label_w = int(font.getlength(label))
    tag_w = int(font.getlength(tag)) + 2 * pad_x
    tag_h = SIZE + 2 * pad_y
    row1_w = label_w + 20 + tag_w
    line2_w = int(font.getlength(line2))
    block_h = wm.height + 44 + tag_h + 26 + SIZE

    cx = OUT_W // 2
    ty = (OUT_H - block_h) // 2
    tile.paste(wm, (cx - wm.width // 2, ty))
    draw = ImageDraw.Draw(tile)
    y = ty + wm.height + 44
    rx = cx - row1_w // 2
    draw.text((rx, y + pad_y), label, font=font, fill=ink)
    bx = rx + label_w + 20
    draw.rectangle((bx, y, bx + tag_w, y + tag_h), outline=TAG_BORDER, width=2)
    draw.text((bx + pad_x, y + pad_y), tag, font=font, fill=ink)
    y += tag_h + 26
    draw.text((cx - line2_w // 2, y), line2, font=font, fill=ink)

    save_capped(tile, HERE / "tile.jpg")
    save_capped(tile, HERE.parents[2] / "public/images/pivotal-ais-fellowship-2027.jpg")


if __name__ == "__main__":
    main()
