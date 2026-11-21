# Content guide: adding things to the site

How to add or change what the homepage shows, where each piece goes, and how to
get an image ready. `AGENTS.md` links here; the rules in `AGENTS.md` (public
repo, `main` is production, noscript in sync) still apply to everything below.

## Where things go

| What | Where | Notes |
| --- | --- | --- |
| Selected Work tiles | `src/data/projects.json` | Shape in `src/types/Project.ts` |
| Upcoming / past talks and events | `src/data/events.json` | Shape in `src/types/Event.ts` |
| Hero line, links, portrait | `src/components/Hero.tsx` | Mirrored in the `<noscript>` block |
| About paragraphs | `src/components/About.tsx` | Mirrored in the `<noscript>` block |
| Images the site serves | `public/images/` | Referenced as `/images/<file>` |
| Image working files | `docs/assets/<name>/` | Sources, generator scripts, candidates. Never served |
| Screenshots for PRs | `docs/screenshots/` | Never served |
| Pages | `src/pages/`, wired in `src/App.tsx` and `src/prerender.tsx` | See "Add a page" |
| Text-only fallback | `<noscript>` in `index.html` | Hand-maintained copy of the visible page |

The homepage order is fixed in `src/pages/Home.tsx`: About, Upcoming, Selected
Work, Past talks.

## Add a Selected Work tile

1. Prepare the image (see "Prepare an image") and save it in `public/images/`.
2. Add an object to `src/data/projects.json`. **Array order is display order**,
   newest first, so a new tile usually goes at the top.

   ```json
   {
     "id": "short-kebab-case-id",
     "title": "Title – Kind",
     "description": "Two sentences at most: what it was and the headline result.",
     "image": "/images/my-tile-2026.jpg",
     "link": "https://example.org/the-thing",
     "year": "2026",
     "categories": ["Paper", "AI Security"]
   }
   ```

   - `id`, `title` and `description` are required; `id` must be unique.
   - `link` makes the whole tile a link (opens in a new tab). Leave it out for
     a tile that goes nowhere.
   - `year` is a string: `"2026"` or a range such as `"2019-2021"`.
   - `categories` become the filter pills above the grid. **Reuse an existing
     category** (check the file) unless a new pill is really wanted: every new
     string adds one. `tags` exists in the schema but is not rendered.
   - The image's alt text is the title.
3. If the tile belongs in the short list crawlers see, add a line to the
   Selected Work list in the `<noscript>` block of `index.html`.
4. Check it (see "Check before opening a PR").

## Add a talk or event

Add an object to `src/data/events.json`. Position in the file does not matter:
entries are sorted by `date`, and each one sits under **Upcoming** until the
day it starts, then moves to **Past talks, conferences & events** by itself
(the split is made in `src/lib/events.ts`, in UTC).

```json
{
  "id": "event-name-2026",
  "title": "Event or talk title",
  "role": "Speaker",
  "with": "Co-host Name (Their Org)",
  "org": "Organiser",
  "place": "City",
  "note": "venue to be confirmed",
  "date": "2026-12-03",
  "when": "Dec 2026",
  "link": "https://example.org/event",
  "image": "/images/event-name-2026.jpg"
}
```

- Required: `id`, `title`, `role`, `date` (`YYYY-MM-DD`, the start day).
- The line under the title reads: **role** `with …`, `org`, `place`, `note`.
  Only the role is bold.
- The date label is automatic: "3 Dec" while upcoming, "Dec 2026" once past.
  Set `when` only to override that, for example when the day is not fixed
  (`"Feb 2027"`) or for a series (`"2012 - 2017"`).
- `endDate` records when a series ended. It is not displayed and does not
  affect the Upcoming/Past split.
- `link` makes the title a link. `image` is optional; most upcoming entries
  have none and get one once there is a photo or share image to use.
- Reuse the role wording already in the file (Speaker, Panel speaker, Host,
  Co-host, Co-organiser, Mentor, Advisor, Expert Invitee, Guest speaker).

Event thumbnails are small (about 80 px wide), decorative (empty alt text) and
hidden on narrow screens, so the row must make sense without one.

## Prepare an image

Tiles and event thumbnails are both shown in a **16:9** box with
`object-fit: cover`, so anything else is cropped from the centre. Make the file
16:9 yourself so the crop is a decision, not an accident.

- **Size:** 1200 × 675 px. Tiles render at most ~370 CSS px wide, so 1200
  covers a 2x display.
- **Format:** JPEG (quality 85, progressive) for photos; PNG for flat graphics
  such as title cards and logos, where JPEG rings around sharp edges.
- **Weight:** aim for 150 KB or less.
- **Name:** kebab-case, with the year where it helps:
  `women4aisafety-2026.jpg`. Reference it as `/images/women4aisafety-2026.jpg`
  (leading slash, no `public`).
- **Keep the subject clear of the edges**, and check that any logo or text on
  the image is still legible at tile size.
- **Rights:** this repo is public. Use the event's or publisher's own share
  image, their logo, or a photo that may be published.

To crop and encode a source image (needs Pillow; `centering` moves the crop
window, `(0.5, 0.5)` is the centre and `(0.5, 0.3)` favours the top):

```bash
python3 - source.png public/images/my-tile-2026.jpg <<'EOF'
import sys
from PIL import Image, ImageOps
src, dest = sys.argv[1], sys.argv[2]
im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
im = ImageOps.fit(im, (1200, 675), Image.LANCZOS, centering=(0.5, 0.5))
im.save(dest, 'JPEG', quality=85, optimize=True, progressive=True)
EOF
```

`scripts/optimise-images.py` re-encodes oversized tiles in bulk (report by
default, `--apply` to rewrite; it copies the originals to
`docs/assets/original-tile-images/` and fixes the paths in the JSON). It only
looks at images referenced from `projects.json`, so **event thumbnails are not
covered**: size those by hand as above.

### Composed tiles (logo over a photo, title cards)

When a tile is built rather than cropped, keep the working files so it can be
rebuilt: make `docs/assets/<name>-tile/` with the source assets, the generator
script and a short `README.md` saying which variant is live, where the sources
came from and how to regenerate. The existing folders there are the pattern.
Only the finished file goes in `public/images/`.

## Change the hero or About copy

Edit `src/components/Hero.tsx` or `src/components/About.tsx`, then make the
same change in the `<noscript>` block in `index.html`. Also check the
`<meta name="description">`, the `og:` tags and the JSON-LD in `index.html` if
the role or title changed.

## Add a page

1. Create the component in `src/pages/`.
2. Add a `<Route>` in `src/App.tsx`.
3. For the page to exist as static HTML (direct loads, crawlers), also add it
   in `src/prerender.tsx` in three places: the `<Route>` list, the
   `PRERENDER_LINKS` set and `TITLES`. A page that only redirects elsewhere
   also goes in `REDIRECTS`.

## Check before opening a PR

```bash
npm ci
npx tsx scripts/validate-projects.ts   # both JSON files against their schemas
npm run dev                            # look at the page
npm run build                          # type-check, build, prerender
```

- The build also fails on invalid JSON data, because the prerender parses it.
- Look at the result at desktop width and at phone width. For a tile, check
  the crop and the filter pills; for an event, check it landed under the right
  heading with the right date label.
- New image: confirm it loads (a wrong path shows the pastel placeholder, not
  an error) and check its size on disk.
- If the hero, About copy or featured work changed, the `<noscript>` block
  changed too.
- A before/after screenshot in `docs/screenshots/` is welcome for visual
  changes.

Then commit on a branch and open a PR. Merging to `main` deploys the site.
Commit subjects follow `content: …`, `style: …`, `feat: …`, `fix: …`, `docs: …`,
`chore: …`, describing the result on the page.
