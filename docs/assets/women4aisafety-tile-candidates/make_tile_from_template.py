#!/usr/bin/env python3
"""Build the Women4AISafety tile from the organiser's deck template.

usage: uv run --with pillow --with numpy python -I make_tile_from_template.py <template.odp>

The template's cover slide is the square event graphic: a 1920x1080 speckled
gradient PNG stretched onto the square as the page background, with the
portrait in its blue disc, the BlueDot Impact logo, the name badge, the
WOMEN4AISAFETY wordmark and the date lines as separate shapes on top. The tile
is 16:9, so the gradient is used unstretched as the tile background and the
shapes are lifted off the square and placed on it.

To lift them, the cover is rendered twice with LibreOffice, on a flat white and
on a flat black page background; the difference between the two renders gives
the exact alpha of every shape, anti-aliased edges included. Two things the
Google Slides export carries are not drawn by LibreOffice, so they are
reconstructed: the portrait's circular crop (the square image frame becomes an
ellipse filled with the portrait) and the blue highlights behind the date
lines (painted into the lifted layer around the rendered text). The purple
base strip is dropped, as in candidate A.

The lifted layer is scaled so the blue disc sits MARGIN px below the top edge
and the date highlight MARGIN px above the bottom edge, and the square's
centre sits on the tile's centre. The gradient's grain is finer than JPEG
can keep within SIZE_CAP at a sane quality, so it is softened by BG_SOFTEN px
after downsampling; the speckle and the gradient both survive.

Needs `soffice` and `pdftoppm` on PATH. Writes C-template-background.jpg here
and the live tile to public/images/women4aisafety-2026.jpg. The template is
not part of the repo.
"""
import re
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

HERE = Path(__file__).resolve().parent
OUT_W, OUT_H = 1200, 675
SIZE_CAP = 150_000
MARGIN = 31  # tile rows above the blue disc and below the date highlight (as in candidate A)
RENDER_DPI = 144  # the 31.75 cm square renders at 1800 px
HILITE = (0x42, 0x85, 0xF4)  # the blue of the disc, used for the date highlights
HILITE_PAD_X, HILITE_PAD_Y = 16, 13  # highlight padding around the date text, in render px
BG_SOFTEN = 0.8  # Gaussian radius on the downsampled gradient; its grain is too fine to fit SIZE_CAP unsoftened
LIVE = "C-template-background.jpg"


def save_capped(img, path, cap=SIZE_CAP):
    q = 88
    for q in range(88, 50, -2):
        img.save(path, "JPEG", quality=q, optimize=True, progressive=True)
        if path.stat().st_size <= cap:
            break
    print(f"{path.name}: {path.stat().st_size // 1000} KB at quality {q}")


def keyed_copy(src_dir, out_odp, colour):
    """Write a copy of the unpacked template whose cover has a flat `colour` background,
    a circular portrait and no base strip."""
    styles = (src_dir / "styles.xml").read_text(encoding="utf-8")
    content = (src_dir / "content.xml").read_text(encoding="utf-8")
    page_w = float(re.search(r'fo:page-width="([\d.]+)cm"', styles.split("<style:page-layout ")[-1]).group(1))
    page = re.search(r"<draw:page .*?</draw:page>", content, flags=re.S).group(0)
    style = re.search(r'draw:style-name="(dp\d+)"', page).group(1)

    keyed = re.sub(
        rf'(<style:style style:name="{style}"[^>]*>.*?)draw:fill="bitmap" draw:fill-image-name="[^"]*" style:repeat="stretch"',
        rf'\1draw:fill="solid" draw:fill-color="{colour}"', content, count=1, flags=re.S)
    assert keyed != content, "cover background style not found"

    def drop_strip(m):  # full-width shapes are the base strip
        w = float(re.search(r'svg:width="([\d.]+)cm"', m.group(0)).group(1))
        return "" if w >= page_w - 0.5 else m.group(0)
    new_page = re.sub(r"<draw:custom-shape .*?</draw:custom-shape>", drop_strip, page, flags=re.S)

    # The portrait: a square image frame in the export, a circle in the original. Replace the frame
    # with an ellipse of the same box, filled with the image (clipped to the ellipse).
    photo = re.search(r'<draw:frame [^>]*>\s*<draw:image xlink:href="(Pictures/[^"]+\.jpe?g)".*?</draw:frame>',
                      new_page, flags=re.S)
    assert photo, "portrait frame not found"
    geo = " ".join(re.findall(r'svg:(?:width|height|x|y)="[^"]+"', photo.group(0)))
    new_page = new_page.replace(photo.group(0),
                                f'<draw:ellipse draw:style-name="tilePhoto" draw:layer="layout" {geo}><text:p/></draw:ellipse>')
    keyed = keyed.replace(page, new_page)
    keyed = keyed.replace("</office:automatic-styles>",
                          '<style:style style:name="tilePhoto" style:family="graphic"><style:graphic-properties '
                          'draw:stroke="none" draw:fill="bitmap" draw:fill-image-name="tilePortrait" style:repeat="stretch"/>'
                          "</style:style></office:automatic-styles>", 1)
    styles = styles.replace("<draw:fill-image ",
                            f'<draw:fill-image draw:name="tilePortrait" xlink:href="{photo.group(1)}" xlink:type="simple" '
                            'xlink:show="embed" xlink:actuate="onLoad"/><draw:fill-image ', 1)

    with zipfile.ZipFile(out_odp, "w") as z:
        z.write(src_dir / "mimetype", "mimetype", compress_type=zipfile.ZIP_STORED)
        for p in sorted(src_dir.rglob("*")):
            rel = p.relative_to(src_dir).as_posix()
            if p.is_dir() or rel == "mimetype":
                continue
            if rel == "content.xml":
                z.writestr(rel, keyed, compress_type=zipfile.ZIP_DEFLATED)
            elif rel == "styles.xml":
                z.writestr(rel, styles, compress_type=zipfile.ZIP_DEFLATED)
            else:
                z.write(p, rel, compress_type=zipfile.ZIP_DEFLATED)


def render_cover(odp, work):
    """Rasterise the first slide of `odp` with LibreOffice; returns an RGB image."""
    profile = work / "lo-profile"
    subprocess.run(["soffice", "--headless", f"-env:UserInstallation={profile.as_uri()}",
                    "--convert-to", "pdf", "--outdir", str(work), str(odp)],
                   check=True, capture_output=True, timeout=180)
    pdf = work / (odp.stem + ".pdf")
    subprocess.run(["pdftoppm", "-r", str(RENDER_DPI), "-f", "1", "-l", "1", "-png", str(pdf), str(work / odp.stem)],
                   check=True, capture_output=True, timeout=120)
    png = next(work.glob(odp.stem + "-*.png"))
    return Image.open(png).convert("RGB")


def lift_layer(on_white, on_black):
    """RGBA array of the shapes: alpha from the white/black difference, colour un-premultiplied from the black render."""
    w = np.asarray(on_white, dtype=np.float32)
    b = np.asarray(on_black, dtype=np.float32)
    alpha = np.clip(1.0 - (w - b).mean(axis=2) / 255.0, 0.0, 1.0)
    safe = np.where(alpha > 1e-3, alpha, 1.0)[..., None]
    colour = np.clip(b / safe, 0, 255)
    colour[alpha < 1e-3] = 0
    return np.dstack([colour, alpha[..., None] * 255.0])


def date_lines(rgba, y_from):
    """Row runs of the date lines: the text runs below `y_from`, each as (top, bottom, left, right)."""
    present = rgba[..., 3] > 8
    rows = present[y_from:].any(axis=1)
    runs, start = [], None
    for i, r in enumerate(rows):
        if r and start is None:
            start = i
        elif not r and start is not None:
            runs.append((start, i))
            start = None
    if start is not None:
        runs.append((start, len(rows)))
    out = []
    for a, b in runs:
        cols = np.where(present[y_from + a:y_from + b].any(axis=0))[0]
        out.append((y_from + a, y_from + b, int(cols[0]), int(cols[-1]) + 1))
    return out


def paint_highlights(rgba, lines):
    """Solid HILITE boxes behind each date line: right-aligned to the longest line, touching each other."""
    right = max(r for _, _, _, r in lines) + HILITE_PAD_X
    edges = [lines[0][0] - HILITE_PAD_Y]
    for (_, b0, _, _), (t1, _, _, _) in zip(lines, lines[1:]):
        edges.append((b0 + t1) // 2)
    edges.append(lines[-1][1] + HILITE_PAD_Y)
    blue = np.array(HILITE, dtype=np.float32)
    for (y0, y1), (_, _, left, _) in zip(zip(edges, edges[1:]), lines):
        box = rgba[y0:y1, left - HILITE_PAD_X:right]
        a = box[..., 3:4] / 255.0
        box[..., :3] = box[..., :3] * a + blue * (1.0 - a)
        box[..., 3] = 255.0
    return rgba


def main():
    template = Path(sys.argv[1]).resolve()
    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp)
        src = work / "template"
        with zipfile.ZipFile(template) as z:
            z.extractall(src)
        styles = (src / "styles.xml").read_text(encoding="utf-8")
        bg_name = re.search(r'<draw:fill-image [^>]*xlink:href="(Pictures/[^"]+)"', styles).group(1)
        background = (Image.open(src / bg_name).convert("RGB").resize((OUT_W, OUT_H), Image.LANCZOS)
                      .filter(ImageFilter.GaussianBlur(BG_SOFTEN)))
        print(f"background {bg_name} -> {OUT_W}x{OUT_H}")

        renders = {}
        for name, colour in (("white", "#ffffff"), ("black", "#000000")):
            keyed_copy(src, work / f"{name}.odp", colour)
            renders[name] = render_cover(work / f"{name}.odp", work)
    rgba = lift_layer(renders["white"], renders["black"])
    side = rgba.shape[0]

    # The date lines are the shape runs in the bottom fifth, below the wordmark.
    lines = [ln for ln in date_lines(rgba, int(side * 0.8)) if ln[1] - ln[0] > 10][-2:]
    assert len(lines) == 2, f"expected two date lines, found {lines}"
    print("date lines at rows", [(t, b) for t, b, _, _ in lines])
    rgba = paint_highlights(rgba, lines)
    layer = Image.fromarray(rgba.astype(np.uint8), "RGBA")

    alpha = rgba[..., 3]
    rows = np.where(alpha.max(axis=1) > 8)[0]
    top, bottom = int(rows[0]), int(rows[-1]) + 1
    scale = (OUT_H - 2 * MARGIN) / (bottom - top)
    size = (round(layer.width * scale), round(layer.height * scale))
    layer = layer.resize(size, Image.LANCZOS)
    x = round(OUT_W / 2 - size[0] / 2)
    y = round(MARGIN - top * scale)
    print(f"shapes span rows {top}-{bottom} of {side}; scale {scale:.4f}; placed at ({x}, {y})")

    tile = background.copy()
    tile.paste(layer, (x, y), layer)
    save_capped(tile, HERE / LIVE)
    save_capped(tile, HERE.parents[2] / "public/images/women4aisafety-2026.jpg")


if __name__ == "__main__":
    main()
