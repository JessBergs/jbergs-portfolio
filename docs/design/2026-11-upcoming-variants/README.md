# Homepage variants: upcoming events and current roles (November 2026)

Five throwaway mockups of the homepage. Each answers the same three questions in a
different way:

1. Where does an **Upcoming** block live so it is on the first screen?
2. How are the **ongoing roles** (mentoring, judging, advising) shown without another
   paragraph of prose?
3. How does the **tile grid stop growing** as projects are added?

They are static HTML, not React. They reuse the live site's tokens (Charter, Quicksand,
the cream-to-blue gradient, the tile card) so the comparison is about layout, not
styling. The one that gets picked is rebuilt properly in `src/`.

## How to view

- Open any `v*.html` in a browser. Fonts come from Google Fonts, tile images from
  `public/images`, so open them from inside the repo.
- Or serve the repo root and browse to this folder:
  `python3 -m http.server 8112 --bind 127.0.0.1` then
  `http://127.0.0.1:8112/docs/design/2026-11-upcoming-variants/`.
- `shots/` has renders of every variant plus the live site as it is today
  (`current-live-*`): `*-fold.png` is the first screen at 1440×900, `*-full.jpg` the
  whole page, `*-mobile.png` the first screen at 390×844.
- Regenerate renders with `node render.cjs` (Playwright) or `./render.sh` (headless Chrome).

## The conventions borrowed

Personal sites of researchers and speakers use a small set of recurring devices for
"what I'm doing" and "where I'll be". The variants borrow them deliberately.

| Convention | Where it is common | What it looks like | Used in |
|---|---|---|---|
| Dated news list | al-folio and Academic Pages themes, most CS PhD and professor homepages | A reverse-chronological list straight under the bio. Date in a muted fixed-width column, one line per item, three to five items, an "all news" link | V1, V5 |
| Calendar-block agenda | Hugo Blox "Recent & Upcoming Talks", university event pages, Luma | Big day number over a small month, then title, venue and a role label. Upcoming is kept apart from past | V2, V4 |
| Talk entry | Academic Pages talks page | Title, full date, a type label (Talk, Panel, Tutorial), then venue and city | The role badges everywhere |
| "Now" prose | nownownow.com pages, Arvind Narayanan, Chip Huyen | Present-tense paragraphs with inline links and an "Updated <date>" stamp. Roles are woven into sentences rather than listed | V3 |
| Service list | Academic CVs | "Role, Organisation, since year" rows | V1 "Currently", V5 sidebar |
| Announcement bar and "featured at" strip | Conference and speaker sites | A slim "Next up" bar at the top, and a strip of organisation logos or wordmarks | V4 |
| Sticky identity column | Modern personal sites | Name, short bio and links pinned on the left while the content scrolls on the right | V5 |

Two things are consistent across the examples looked at: dates are typeset quieter than
the event (small, muted, often monospace), and "upcoming" is either a separate list or
simply the top of a dated list, never mixed into the project tiles.

## The five variants

### V1 · Dated news list (`v1-news-list.html`)

The smallest change. Hero and bio stay as they are. Under them, a two-column band:
"Upcoming" as a dated list on the left, "Currently" as a role register on the right.
The mentoring paragraph leaves the bio because the register now carries it.

Tiles: unchanged, capped at six with a "show all 20 projects" button.

Trade-off: closest to the academic norm and the least work. The tile cap hides the
older work until someone clicks.

### V2 · Agenda sidebar (`v2-agenda-sidebar.html`)

Three columns above the fold: identity, bio, and an "Upcoming" card with
calendar-block dates. Roles become a chip strip under the columns, organisation in bold
and role in grey. On phones the card moves above the bio.

Tiles: compact, four per row, title and tags only (no description). The page is about
half as long as today.

Trade-off: more boxes on the first screen, and the bio column is narrower. Compact tiles
lose the one-line description, which may matter for the papers.

### V3 · Now page (`v3-now-page.html`)

The bio becomes "What I'm doing now" with an "Updated" stamp. Everything current is
present-tense prose with inline links, and the upcoming talks are one sentence in a
"Speaking next" box with the dates typeset small.

Tiles: three "Featured" tiles stay as tiles, the other seventeen become a compact
two-column list with a thumbnail, title, year and categories.

Trade-off: the most personal and the least "dashboard". It loses most of the tile
imagery, and the stamp makes it obvious when the prose has gone stale.

### V4 · Speaker page (`v4-speaker.html`)

A slim "Next up" bar under the nav, a horizontal rail of event cards with colour-coded
role badges (Talk, Panel, Host, Advisor), and a "Working with" wordmark strip in place of
logos. On phones the bar is the one thing that keeps "what's next" on the first screen.

Tiles: grouped by year with a quiet year rule, and everything before 2025 collapsed
behind "Earlier work" so the page stops growing downwards.

Trade-off: the most promotional register of the five. The bar needs updating each time
an event passes.

### V5 · Sticky profile and feed (`v5-sticky-profile.html`)

Two columns. Name, a two-sentence bio and the "Currently" roles are pinned on the left.
The right column scrolls through a year-grouped "Upcoming" list and then the tiles.

Tiles: all of them, two per row, so nothing is cut.

Trade-off: nothing is hidden and the identity never leaves the screen, but it is the
longest page of the five and the sidebar has to stay short to fit a laptop screen.

## Content in the mockups

The upcoming items and roles are placeholders to be confirmed before anything ships:
the Liftoff and SASH entries have no venue yet, the NeurIPS social date is marked
"tbc", and the Global Challenges Project name is an expansion of "GCP" that needs
checking.
