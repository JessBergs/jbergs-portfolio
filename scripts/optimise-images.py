#!/usr/bin/env python3
"""Re-encode the tile images in public/images for web delivery.

Tiles render at most ~370 CSS px wide (three columns in a 1180px container), so
1200px of width covers a 2x display with room to spare. Everything wider than
that is paying for pixels nobody sees.

For each image this picks the better of two encodings:

- **JPEG** for photographic tiles, where continuous tone compresses well.
- **Quantised PNG** for flat graphics (title cards, logos), where JPEG puts
  ringing around sharp letterforms and a 256-colour palette is lossless-looking
  and smaller.

The choice is made on the number of distinct colours in the resized image, then
sanity-checked against the actual encoded sizes. Originals are preserved in
docs/assets/original-tile-images/ (and in git history) before anything is
rewritten.

Usage:
    python3 scripts/optimise-images.py           # report only
    python3 scripts/optimise-images.py --apply   # rewrite public/images
"""
import json
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / 'public' / 'images'
ORIGINALS = ROOT / 'docs' / 'assets' / 'original-tile-images'
PROJECTS = ROOT / 'src' / 'data' / 'projects.json'

MAX_WIDTH = 1200
JPEG_QUALITY = 85
FLAT_GRAPHIC_COLOURS = 20_000   # above this, treat the image as photographic
MIN_SAVING = 0.05               # skip anything that would not shrink by at least this


def referenced_images() -> list[str]:
    """Tile filenames actually used by the site, in project order."""
    data = json.loads(PROJECTS.read_text())
    seen, out = set(), []
    for project in data:
        image = project.get('image')
        if not image:
            continue
        name = image.rsplit('/', 1)[-1]
        if name not in seen:
            seen.add(name)
            out.append(name)
    return out


def load_flat(path: Path) -> Image.Image:
    """Open as RGB. Every tile's alpha channel is fully opaque, so flattening
    against white is a no-op — but do it explicitly rather than assume."""
    im = Image.open(path)
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        if im.getchannel('A').getextrema()[0] < 255:
            backdrop = Image.new('RGBA', im.size, (255, 255, 255, 255))
            im = Image.alpha_composite(backdrop, im)
    return im.convert('RGB')


def resized(im: Image.Image) -> Image.Image:
    if im.width <= MAX_WIDTH:
        return im
    height = round(im.height * MAX_WIDTH / im.width)
    return im.resize((MAX_WIDTH, height), Image.LANCZOS)


def encode(im: Image.Image, tmp: Path) -> tuple[str, bytes]:
    """Return (extension, bytes) for the better of JPEG and quantised PNG."""
    jpeg_path = tmp / 'candidate.jpg'
    im.save(jpeg_path, 'JPEG', quality=JPEG_QUALITY, optimize=True, progressive=True)
    jpeg = jpeg_path.read_bytes()

    colours = im.getcolors(maxcolors=FLAT_GRAPHIC_COLOURS)
    if colours is None:          # too many colours -> photographic
        return 'jpg', jpeg

    png_path = tmp / 'candidate.png'
    im.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG) \
      .save(png_path, 'PNG', optimize=True)
    png = png_path.read_bytes()

    return ('png', png) if len(png) < len(jpeg) else ('jpg', jpeg)


def main() -> None:
    apply = '--apply' in sys.argv
    tmp = ROOT / '.optimise-tmp'
    tmp.mkdir(exist_ok=True)

    if apply:
        ORIGINALS.mkdir(parents=True, exist_ok=True)

    renames: dict[str, str] = {}
    before = after = 0

    print(f'{"tile":<46} {"before":>9}  {"after":>9}   saved')
    print('-' * 84)

    for name in referenced_images():
        src = IMAGES / name
        if not src.exists():
            print(f'{name:<46}  MISSING — skipped')
            continue

        original_bytes = src.stat().st_size
        im = resized(load_flat(src))
        ext, data = encode(im, tmp)

        # Re-encoding an already-lean JPEG costs quality and often costs bytes
        # too. Leave those alone rather than degrade them for nothing.
        if len(data) > original_bytes * (1 - MIN_SAVING):
            before += original_bytes
            after += original_bytes
            print(f'{name:<46} {original_bytes//1024:>6} KB  '
                  f'{"—":>6}      already lean, left as is')
            continue

        new_name = f'{Path(name).stem}.{ext}'
        before += original_bytes
        after += len(data)

        saved = 100 * (1 - len(data) / original_bytes)
        note = '' if new_name == name else f'  -> {new_name}'
        print(f'{name:<46} {original_bytes//1024:>6} KB  {len(data)//1024:>6} KB   '
              f'{saved:5.1f}%{note}')

        if apply:
            shutil.copy2(src, ORIGINALS / name)
            if new_name != name:
                src.unlink()
                renames[name] = new_name
            (IMAGES / new_name).write_bytes(data)

    print('-' * 84)
    print(f'{"TOTAL":<46} {before//1024:>6} KB  {after//1024:>6} KB   '
          f'{100 * (1 - after / before):5.1f}%')

    if apply and renames:
        text = PROJECTS.read_text()
        for old, new in renames.items():
            text = text.replace(f'/images/{old}"', f'/images/{new}"')
        PROJECTS.write_text(text)
        json.loads(text)   # parse check
        print(f'\nUpdated {len(renames)} image paths in {PROJECTS.relative_to(ROOT)}')

    shutil.rmtree(tmp)
    if not apply:
        print('\n(report only — pass --apply to rewrite)')


if __name__ == '__main__':
    main()
