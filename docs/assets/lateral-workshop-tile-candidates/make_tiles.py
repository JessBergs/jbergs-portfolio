"""Generate Lateral Workshop tile candidates (1200x675, 16:9) plus a contact sheet.

Usage: .venv/bin/python make_tiles.py
Outputs to ./previews/
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

SRC = Path("src")
OUT = Path("previews")
OUT.mkdir(exist_ok=True)
W, H = 1200, 675

# Site palette (theme.css)
OFFWHITE = (246, 232, 220)
PINE = (54, 73, 85)
PINE_DEEP = (42, 49, 53)
BRICK = (185, 99, 67)
CREAM = (254, 252, 249)

SERIF = lambda s: ImageFont.truetype("fonts/Source_Serif_4-600.ttf", s)
SERIF_R = lambda s: ImageFont.truetype("fonts/Source_Serif_4-400.ttf", s)
SANS = lambda s: ImageFont.truetype("fonts/Inter-500.ttf", s)
SANS_R = lambda s: ImageFont.truetype("fonts/Inter-400.ttf", s)

# Speaker order as on lateralworkshop.org
SPEAKERS = [
    ("daniel-kokotajlo.jpg", "Daniel Kokotajlo"),
    ("boston-nyer.png", "Boston Nyer"),
    ("ryan-kidd.png", "Ryan Kidd"),
    ("mckenna-fitzgerald.png", "McKenna Fitzgerald"),
    ("abbey-chaver.png", "Abbey Chaver"),
    ("jonas-vollmer.png", "Jonas Vollmer"),
    ("ada-lin.jpg", "Ada Lin"),
    ("agustin-covarrubias.jpeg", "Agustín Covarrubias"),
    ("lawrence-chan-v3.png", "Lawrence Chan"),
    ("joshua-landes.png", "Joshua Landes"),
    ("asya-bergal.jpg", "Asya Bergal"),
    ("david-abecassis.png", "David Abecassis"),
    ("max-daniel.jpg", "Max Daniel"),
    ("eli-lifland.png", "Eli Lifland"),
    ("jess-bergs.png", "Jess Bergs"),
    ("joseph-de-wolk.png", "Joseph de Wolk"),
    ("carrick-flynn.png", "Carrick Flynn"),
    ("jim-chapman.png", "Jim Chapman"),
]
JESS = "jess-bergs.png"


def load_bg(wash=0.0, wash_color=OFFWHITE):
    """Berkeley watercolor cropped to 16:9, keeping campanile + bay, optional warm wash."""
    im = Image.open(SRC / "berkeley_watercolor_view.png").convert("RGB")
    w, h = im.size  # 1448 x 1086
    ch = int(w * 9 / 16)  # 814
    top = 150  # trim sky, keep hillside
    im = im.crop((0, top, w, top + ch)).resize((W, H), Image.LANCZOS)
    im = ImageEnhance.Color(im).enhance(0.94)
    if wash:
        im = Image.blend(im, Image.new("RGB", (W, H), wash_color), wash)
    return im


def square_face(name, size):
    """Centre-square crop biased towards the top (faces sit high in portraits)."""
    im = Image.open(SRC / name).convert("RGB")
    w, h = im.size
    s = min(w, h)
    if h > w:
        top = int((h - s) * 0.25)
        box = (0, top, s, top + s)
    else:
        left = (w - s) // 2
        box = (left, 0, left + s, s)
    return im.crop(box).resize((size, size), Image.LANCZOS)


def circle_face(name, d, ring=3, ring_color=(255, 255, 255)):
    """Circular headshot with ring and soft shadow, returned as RGBA with padding."""
    pad = 14
    S = d + 2 * ring + 2 * pad
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    # shadow
    sh = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(sh).ellipse((pad, pad + 4, pad + d + 2 * ring, pad + d + 2 * ring + 4), fill=(42, 49, 53, 90))
    sh = sh.filter(ImageFilter.GaussianBlur(7))
    layer.alpha_composite(sh)
    # ring
    ImageDraw.Draw(layer).ellipse((pad, pad, pad + d + 2 * ring, pad + d + 2 * ring), fill=ring_color + (255,))
    # face
    face = square_face(name, d).convert("RGBA")
    mask = Image.new("L", (d * 4, d * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, d * 4 - 1, d * 4 - 1), fill=255)
    mask = mask.resize((d, d), Image.LANCZOS)
    layer.paste(face, (pad + ring, pad + ring), mask)
    return layer


def paste_center(canvas, layer, cx, cy):
    canvas.alpha_composite(layer, (int(cx - layer.width / 2), int(cy - layer.height / 2)))


def wordmark(draw, x, y, size=64, sub=None, sub_size=22, anchor="la", color=PINE_DEEP):
    draw.text((x, y), "Lateral Workshop", font=SERIF(size), fill=color, anchor=anchor)
    if sub:
        draw.text((x, y + size * 1.15), sub, font=SANS(sub_size), fill=PINE, anchor=anchor)


# ---------- Variant A: full speaker grid on washed watercolor ----------
def variant_a():
    bg = load_bg(wash=0.42).convert("RGBA")
    d = 120
    cols, rows = 6, 3
    cell = 166
    grid_w = cols * cell
    x0 = (W - grid_w) / 2 + cell / 2
    y0 = 200
    for i, (f, _) in enumerate(SPEAKERS):
        r, c = divmod(i, cols)
        ring, rc = (3, (255, 255, 255))
        paste_center(bg, circle_face(f, d, ring, rc), x0 + c * cell, y0 + r * cell)
    draw = ImageDraw.Draw(bg)
    draw.text((W / 2, 58), "Lateral Workshop", font=SERIF(50), fill=PINE_DEEP, anchor="mm")
    draw.text((W / 2, 106), "Berkeley, CA · 11–13 September 2026", font=SANS(22), fill=PINE, anchor="mm")
    return bg.convert("RGB")


# ---------- Variant B: hero row of five, Jess centre ----------
def variant_b():
    bg = load_bg(wash=0.30).convert("RGBA")
    row = ["daniel-kokotajlo.jpg", "eli-lifland.png", JESS, "ryan-kidd.png", "jonas-vollmer.png"]
    xs = [170, 380, 600, 820, 1030]
    cy = 400
    for f, x in zip(row, xs):
        if f == JESS:
            paste_center(bg, circle_face(f, 250, 4, (255, 255, 255)), x, cy)
        else:
            paste_center(bg, circle_face(f, 190, 4, (255, 255, 255)), x, cy)
    draw = ImageDraw.Draw(bg)
    draw.text((W / 2, 100), "Lateral Workshop", font=SERIF(72), fill=PINE_DEEP, anchor="mm")
    draw.text((W / 2, 168), "Berkeley, CA · 11–13 September 2026", font=SANS(26), fill=PINE, anchor="mm")
    return bg.convert("RGB")


# ---------- Variant C: the site's own social preview (watercolor + wordmark only) ----------
def variant_c():
    im = Image.open(SRC / "social-preview-v6.jpg").convert("RGB")  # 1200x630
    # scale to cover 1200x675 then centre-crop
    s = H / im.height
    im = im.resize((int(im.width * s), H), Image.LANCZOS)
    left = (im.width - W) // 2
    im = im.crop((left, 0, left + W, H))
    draw = ImageDraw.Draw(im)
    draw.text((766, 548), "Berkeley, CA · 11–13 September 2026", font=SANS(21), fill=PINE_DEEP, anchor="ls")
    return im


# ---------- Variant D: split — watercolor + wordmark left, 3x3 faces right ----------
def variant_d():
    bg = load_bg(wash=0.12).convert("RGBA")
    # right panel wash
    panel = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pd = ImageDraw.Draw(panel)
    px = 690
    pd.rectangle((px, 0, W, H), fill=OFFWHITE + (225,))
    # soft edge
    for i in range(60):
        a = int(225 * i / 60)
        pd.line((px - 60 + i, 0, px - 60 + i, H), fill=OFFWHITE + (a,))
    bg.alpha_composite(panel)
    nine = ["daniel-kokotajlo.jpg", "eli-lifland.png", "ryan-kidd.png",
            "jonas-vollmer.png", JESS, "lawrence-chan-v3.png",
            "max-daniel.jpg", "asya-bergal.jpg", "carrick-flynn.png"]
    d, cell = 128, 158
    gx = px + (W - px) / 2 - cell
    gy = H / 2 - cell
    for i, f in enumerate(nine):
        r, c = divmod(i, 3)
        ring, rc = (3, (255, 255, 255))
        paste_center(bg, circle_face(f, d, ring, rc), gx + c * cell, gy + r * cell)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).rounded_rectangle((20, 370, 520, 640), 40, fill=OFFWHITE + (190,))
    glow = glow.filter(ImageFilter.GaussianBlur(28))
    bg.alpha_composite(glow)
    draw = ImageDraw.Draw(bg)
    draw.text((56, 470), "Lateral", font=SERIF(84), fill=PINE_DEEP, anchor="ls")
    draw.text((56, 556), "Workshop", font=SERIF(84), fill=PINE_DEEP, anchor="ls")
    draw.text((58, 602), "Berkeley, CA · 11–13 September 2026", font=SANS(22), fill=PINE_DEEP, anchor="ls")
    return bg.convert("RGB")


# ---------- In-situ card mock (mirrors .project-card CSS) ----------
def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= max_w:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def card(media, title, desc, tags, year, cw=380):
    mh = int(cw * 9 / 16)
    pad = 20
    body_font, desc_font, tag_font = SANS(17), SANS_R(14), SANS(11)
    tmp = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    t_lines = wrap(tmp, title, body_font, cw - 2 * pad)
    d_lines = wrap(tmp, desc, desc_font, cw - 2 * pad)
    ch = mh + pad + len(t_lines) * 23 + 10 + len(d_lines) * 21 + 12 + 26 + 8 + 18 + pad
    im = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    # rounded card
    mask = Image.new("L", (cw, ch), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, cw - 1, ch - 1), 14, fill=255)
    base = Image.new("RGBA", (cw, ch), CREAM + (255,))
    base.paste(media.resize((cw, mh), Image.LANCZOS), (0, 0))
    im.paste(base, (0, 0), mask)
    draw = ImageDraw.Draw(im)
    draw.rounded_rectangle((0, 0, cw - 1, ch - 1), 14, outline=(225, 219, 212))
    y = mh + pad
    for l in t_lines:
        draw.text((pad, y), l, font=body_font, fill=(10, 10, 10)); y += 23
    y += 10
    for l in d_lines:
        draw.text((pad, y), l, font=desc_font, fill=(80, 80, 80)); y += 21
    y += 12
    x = pad
    for t in tags:
        tw = draw.textlength(t, font=tag_font) + 18
        draw.rounded_rectangle((x, y, x + tw, y + 22), 11, fill=(240, 238, 235))
        draw.text((x + 9, y + 5), t, font=tag_font, fill=(80, 80, 80))
        x += tw + 6
    y += 34
    draw.text((pad, y), year, font=SANS(12), fill=(140, 140, 140))
    return im


TITLE = "Lateral Workshop 2026 – Expert Guest"
DESC = ("Expert guest at Lateral, a three-day workshop in Berkeley, California (11–13 September 2026) for "
        "experienced professionals moving into AI safety. Talked with participants about what working in the "
        "field looks like day to day, how to make the move, and where their experience fits.")
TAGS = ["Public Speaking", "Mentorship", "AI Security"]

if __name__ == "__main__":
    variants = {"A-speaker-grid": variant_a(), "B-hero-row": variant_b(),
                "C-site-og-image": variant_c(), "D-split": variant_d()}
    cards = []
    for k, im in variants.items():
        im.save(OUT / f"{k}.png", optimize=True)
        cards.append((k, card(im, TITLE, DESC, TAGS, "2026")))
    gap, m = 40, 40
    sheet_w = m * 2 + sum(c.width for _, c in cards) + gap * (len(cards) - 1)
    sheet_h = m * 2 + 36 + max(c.height for _, c in cards)
    sheet = Image.new("RGB", (sheet_w, sheet_h), (251, 247, 242))
    sd = ImageDraw.Draw(sheet)
    x = m
    for k, c in cards:
        sd.text((x, m), k, font=SANS(15), fill=PINE)
        sheet.paste(c, (x, m + 36), c)
        x += c.width + gap
    sheet.save(OUT / "contact-sheet.png", optimize=True)
    print("wrote", sorted(p.name for p in OUT.iterdir()))
