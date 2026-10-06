#!/usr/bin/env python3
"""Build the tile for the PNAS Nexus political knowledge paper.

A typographic title card in the site's own palette and Charter face (the
gradient runs between --color-bg-top and --color-bg-bottom from src/index.css).
It replaces the generic arXiv logo the tile used while the paper was a preprint.

Usage (needs Pillow; FreeType reads the site's woff2 files directly):
    uv run --no-project --with pillow python docs/assets/pnas-nexus-tile/make_tile.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[3]
FONTS = ROOT / 'public' / 'fonts' / 'charter'
OUT = ROOT / 'public' / 'images' / 'pnas-nexus-political-knowledge.jpg'

W, H = 1200, 630
PAD = 80
BG_TOP = (0xFE, 0xFC, 0xF9)
BG_BOTTOM = (0xC6, 0xD6, 0xE3)
INK = (0x0A, 0x0A, 0x0A)
INK_SOFT = (0x2C, 0x31, 0x40)
INK_MUTE = (0x6B, 0x71, 0x84)

TITLE = 'Conversational AI increases political knowledge as effectively as self-directed internet search'
AUTHORS = 'Luettgau, Kirk, Hackenburg, Bergs, Davidson, Ogden, Siddarth, Huang & Summerfield'
KICKER = 'PNAS NEXUS'
FOOTER = 'Volume 5, Issue 10 · October 2026'


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / f'charter_{name}.woff2'), size)


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines, line = [], ''
    for word in text.split():
        trial = f'{line} {word}'.strip()
        if draw.textlength(trial, font=f) <= width:
            line = trial
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def main() -> None:
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)

    # Diagonal gradient, warm paper top left to the site's pale blue bottom right.
    for y in range(H):
        for x in range(0, W, 4):
            t = min(1.0, max(0.0, (x / W) * 0.45 + (y / H) * 0.75))
            c = tuple(round(a + (b - a) * t) for a, b in zip(BG_TOP, BG_BOTTOM))
            draw.line([(x, y), (x + 3, y)], fill=c)

    kicker = font('bold', 26)
    draw.text((PAD, PAD), KICKER, font=kicker, fill=INK_SOFT)
    kicker_w = draw.textlength(KICKER, font=kicker)
    draw.line([(PAD + kicker_w + 24, PAD + 15), (W - PAD, PAD + 15)], fill=INK_MUTE, width=1)

    title = font('bold', 58)
    y = PAD + 80
    for line in wrap(draw, TITLE, title, W - 2 * PAD):
        draw.text((PAD, y), line, font=title, fill=INK)
        y += 74

    authors = font('italic', 26)
    y += 26
    for line in wrap(draw, AUTHORS, authors, W - 2 * PAD):
        draw.text((PAD, y), line, font=authors, fill=INK_SOFT)
        y += 36

    footer = font('regular', 24)
    draw.text((PAD, H - PAD - 24), FOOTER, font=footer, fill=INK_SOFT)

    img.save(OUT, 'JPEG', quality=88, optimize=True, progressive=True)
    print(f'{OUT.relative_to(ROOT)}: {OUT.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
