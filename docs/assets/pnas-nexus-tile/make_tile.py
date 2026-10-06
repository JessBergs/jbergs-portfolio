#!/usr/bin/env python3
"""Build the tile for the PNAS Nexus political knowledge paper.

The card mimics the paper's page on Oxford Academic: the journal's banner and
logo across the top, a black navigation strip, then the article header on white
(JOURNAL ARTICLE label, Merriweather title with the open-access mark, linked
author names in Source Sans, citation line).

Inputs in this folder, taken from the journal site's header (2026-10-06):
    pnasnexus-logo.png            journal logo, white wordmark on transparent
    pnasnexus-banner.png          banner gradient with the triangle facets
    pnasnexus-banner-overlay.png  slanted panel at the banner's right edge

Merriweather and Source Sans 3 (both SIL OFL) are downloaded from google/fonts
on first run into ~/.cache/jbergs-portfolio-fonts.

Usage (needs Pillow):
    uv run --no-project --with pillow python docs/assets/pnas-nexus-tile/make_tile.py
"""
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OUT = ROOT / 'public' / 'images' / 'pnas-nexus-political-knowledge.jpg'
FONT_CACHE = Path.home() / '.cache' / 'jbergs-portfolio-fonts'
FONT_URLS = {
    'merriweather': 'https://github.com/google/fonts/raw/main/ofl/merriweather/Merriweather%5Bopsz,wdth,wght%5D.ttf',
    'sourcesans': 'https://github.com/google/fonts/raw/main/ofl/sourcesans3/SourceSans3%5Bwght%5D.ttf',
    'sourcesans-italic': 'https://github.com/google/fonts/raw/main/ofl/sourcesans3/SourceSans3-Italic%5Bwght%5D.ttf',
}

W, H = 1200, 675   # the tile frame is 16:9, so nothing is cropped
PAD = 60
BANNER_H = 180
NAV_H = 16

INK = (0x2A, 0x2A, 0x2A)
LINK = (0x00, 0x6F, 0xB7)
CHIP_BG = (0xE4, 0xE4, 0xE4)
OPEN_ACCESS = (0xF6, 0x82, 0x12)

TITLE = 'Conversational AI increases political knowledge as effectively as self-directed internet search'
AUTHORS = ['Lennart Luettgau', 'Hannah Rose Kirk', 'Kobi Hackenburg', 'Jessica Bergs', 'Henry Davidson',
           'Henry Ogden', 'Divya Siddarth', 'Saffron Huang', 'Christopher Summerfield']
JOURNAL = 'PNAS Nexus'
CITATION = ', Volume 5, Issue 10, October 2026, pgag305,'
DOI = 'https://doi.org/10.1093/pnasnexus/pgag305'
PUBLISHED = '06 October 2026'


def font(name: str, size: int, weight: int, opsz: int | None = None) -> ImageFont.FreeTypeFont:
    path = FONT_CACHE / f'{name}.ttf'
    if not path.exists():
        FONT_CACHE.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(FONT_URLS[name], path)
    f = ImageFont.truetype(str(path), size)
    axes = {b'Weight': weight, b'Optical size': opsz or size, b'Width': 100}
    f.set_variation_by_axes([axes[a['name']] for a in f.get_variation_axes()])
    return f


def wrap(draw: ImageDraw.ImageDraw, words: list[str], f: ImageFont.FreeTypeFont, width: int, sep: str = ' ') -> list[list[str]]:
    lines, line = [], []
    for word in words:
        if line and draw.textlength(sep.join(line + [word]), font=f) > width:
            lines.append(line)
            line = []
        line.append(word)
    lines.append(line)
    return lines


def banner(img: Image.Image, draw: ImageDraw.ImageDraw) -> None:
    art = Image.open(HERE / 'pnasnexus-banner.png').convert('RGBA')
    sx, sy = W / art.width, BANNER_H / art.height   # the overlay gets the same stretch as the banner
    art = art.resize((W, BANNER_H), Image.LANCZOS)
    img.paste(art, (0, 0), art)
    overlay = Image.open(HERE / 'pnasnexus-banner-overlay.png').convert('RGBA')
    overlay = overlay.resize((round(overlay.width * sx), round(overlay.height * sy)), Image.LANCZOS)
    img.paste(overlay, (W - overlay.width, 0), overlay)

    logo = Image.open(HERE / 'pnasnexus-logo.png').convert('RGBA')
    logo_h = 124
    logo = logo.resize((round(logo.width * logo_h / logo.height), logo_h), Image.LANCZOS)
    img.paste(logo, (PAD - 10, (BANNER_H - logo_h) // 2), logo)

    nas = font('sourcesans', 25, 300)
    for i, line in enumerate(['The National Academy of Sciences', 'of the United States of America']):
        draw.text((W - PAD - draw.textlength(line, font=nas), 62 + i * 30), line, font=nas, fill='white')

    draw.rectangle([0, BANNER_H, W, BANNER_H + NAV_H], fill='black')


def open_access_mark(draw: ImageDraw.ImageDraw, x: float, y: float, size: int) -> None:
    """The orange open padlock that follows open-access titles."""
    stroke = max(3, size // 9)
    body_r = size * 0.32
    cx, cy = x + size * 0.36, y + size * 0.66
    draw.ellipse([cx - body_r, cy - body_r, cx + body_r, cy + body_r], outline=OPEN_ACCESS, width=stroke)
    draw.ellipse([cx - stroke * 0.7, cy - stroke * 0.7, cx + stroke * 0.7, cy + stroke * 0.7], fill=OPEN_ACCESS)
    # Shackle: an arch opening upward from the right of the body, swung open.
    sw = size * 0.44
    top = y + size * 0.02
    draw.arc([cx - sw / 2, top, cx + sw / 2, top + sw], 180, 360, fill=OPEN_ACCESS, width=stroke)
    draw.line([(cx + sw / 2 - stroke / 2, top + sw / 2), (cx + sw / 2 - stroke / 2, cy - body_r + 2)], fill=OPEN_ACCESS, width=stroke)


def main() -> None:
    img = Image.new('RGB', (W, H), 'white')
    draw = ImageDraw.Draw(img)
    banner(img, draw)

    y = BANNER_H + NAV_H + 38
    chip = font('sourcesans', 21, 400)
    label = 'JOURNAL ARTICLE'
    tracking = 2.2
    label_w = sum(draw.textlength(c, font=chip) + tracking for c in label) - tracking
    draw.rectangle([PAD, y, PAD + label_w + 22, y + 32], fill=CHIP_BG)
    cx = PAD + 11
    for c in label:
        draw.text((cx, y + 4), c, font=chip, fill=INK)
        cx += draw.textlength(c, font=chip) + tracking

    title = font('merriweather', 42, 700, opsz=24)
    y += 50
    lines = wrap(draw, TITLE.split(), title, W - 2 * PAD - 40)
    for line in lines:
        draw.text((PAD, y), ' '.join(line), font=title, fill=INK)
        last_w = draw.textlength(' '.join(line), font=title)
        y += 56
    open_access_mark(draw, PAD + last_w + 14, y - 56 + 2, 44)

    authors = font('sourcesans', 27, 400)
    y += 16
    names = [n + (',' if i < len(AUTHORS) - 1 else '') for i, n in enumerate(AUTHORS)]
    for line in wrap(draw, names, authors, W - 2 * PAD):
        x = PAD
        for word in line:
            name = word.rstrip(',')
            w = draw.textlength(name, font=authors)
            draw.text((x, y), name, font=authors, fill=LINK)
            draw.line([(x, y + 31), (x + w, y + 31)], fill=LINK, width=2)
            x += w
            if word.endswith(','):
                draw.text((x, y), ',', font=authors, fill=INK)
                x += draw.textlength(', ', font=authors)
        y += 38

    y += 22
    italic = font('sourcesans-italic', 25, 400)
    regular = font('sourcesans', 25, 400)
    draw.text((PAD, y), JOURNAL, font=italic, fill=INK)
    draw.text((PAD + draw.textlength(JOURNAL, font=italic), y), CITATION, font=regular, fill=INK)
    y += 34
    draw.text((PAD, y), DOI, font=regular, fill=LINK)
    draw.line([(PAD, y + 29), (PAD + draw.textlength(DOI, font=regular), y + 29)], fill=LINK, width=2)
    y += 38
    bold = font('sourcesans', 25, 700)
    draw.text((PAD, y), 'Published:', font=bold, fill=INK)
    draw.text((PAD + draw.textlength('Published:  ', font=bold), y), PUBLISHED, font=regular, fill=INK)

    img.save(OUT, 'JPEG', quality=88, optimize=True, progressive=True)
    print(f'{OUT.relative_to(ROOT)}: {OUT.stat().st_size // 1024} KB, content ends at y={y + 30}')


if __name__ == '__main__':
    main()
