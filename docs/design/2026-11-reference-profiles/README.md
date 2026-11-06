# Reference profiles (November 2026)

Thirty personal sites of PhD students, postdocs, professors and independent researchers,
captured as a design reference before round three of the homepage concepts. The captures
in `shots/` are other people's work and stay local (the folder is gitignored); `sites.json`
and `capture.cjs` regenerate them:

    PLAYWRIGHT_PKG=/path/to/playwright node capture.cjs

`index.html` is a gallery of the captures with a one-line note on what each site does that
was worth borrowing. Serve the repo root and open it.

## What the genre does

Across the thirty, the same parts recur, whatever the styling:

- An identity block: a small photo, name, one or two lines of title and affiliation, a short
  list of links (email, Scholar, CV). Pinned left (Feng, Heer, Froehlich, Litt, Bigham),
  right (Bernstein), or centred (Barron, Navarro, Canelón).
- A first-person prose bio with the institutions, advisors and collaborators as links.
- Work as a list with a thumbnail on the left of each entry (Barron, Feng, Bernstein), as a
  thumbnail grid with year markers (Dragicevic), as rows by theme (Litt, Heer), or as plain
  text by year (Guo, Dörk, Victor).
- A dated list of updates with the date in a quiet gutter (Feng, Bigham).
- Upcoming things as a short dated list in a sidebar (Bernstein's "Talks and events"), as a
  nav item (Liao's "Upcoming travel/talks", Canelón's and Mohamed's "Talks"), as the first
  tile (Schwulst), or as a ticker (Lupi).
- Mentoring, students and service as their own sections (Froehlich, Bernstein, Liao).
- One device that carries the personality: a typeface (Feng), a page colour (Litt,
  Matuschak), a drawing (Parrish, Canelón, Dörk), a view switch (Albrecht).
- A "last updated" line.

## The high-profile set (added the same day)

A second, larger set: 134 personal pages of well-known researchers across AI, AI safety,
HCI and visualisation, theory, programming languages, mathematics and physics, economics,
philosophy and technology studies. `sites-high-profile.json` lists them with a field each,
`capture2.cjs` captures them in slices (it records status, final URL and page title into
`shots/<key>.json`), `notes-high-profile.json` has a one-line description per page, and
`build_gallery.py` assembles `index-high-profile.html`, grouped by field, with the
failures listed at the end.

    PLAYWRIGHT_PKG=/path/to/playwright node capture2.cjs sites-high-profile.json 0 45
    python3 build_gallery.py

116 captured; 18 failed (bot checks, certificate errors, dead hosts). Six of the 116 turned
out not to be personal pages at capture time and are flagged in the gallery.

### What the high-profile set adds to the genre notes above

- **Most of the most-cited people have no design at all.** Russell, Levine, Liang, Kleinberg,
  Tao, Knuth, Lamport, Stroustrup, Kernighan, Jordan, Pineau, Veloso, Sutton: unstyled HTML,
  a portrait, titles, and lists of links. The page is a directory, not a presentation.
- **A short dated news list is the one dynamic element** nearly everyone keeps: Leskovec's
  What's new, Choi's News, Mitchell's The Latest, Anderson's NEW badges, MacKay's Recent
  news, Kasirzadeh's What's new, Bostrom's dated note plus Recent additions.
- **Upcoming is rarely its own block.** Where it exists it is a nav item (Talks, Events,
  Speaking, Gigs, Calendar: Chalmers, Ellenberg, Turkle, Benjamin, Lessig, Carroll, Mack,
  Huyen, Raschka, Cho), a sidebar list with date, city and event (Klemmer), or the first
  section below the fold (Buxton's Upcoming Talks and Events).
- **Status notes are common and valued**: "on sabbatical this year" (Jurafsky), "on leave,
  not taking students" (Pineau, Aaronson, Hinton), "recruiting a PhD student for autumn"
  (Ko), "what I am mostly thinking about this month" (Bostrom), "please read before
  contacting me" (Aaronson, Hartmann, Bowman, Might, Lamport).
- **One sentence of purpose above the fold** appears on the designed pages: Narayanan ("I
  study AI and its societal impact"), Kim ("as machines get smarter, humans do too"), Ko,
  Watts, Strogatz (a question), Singer (one large serif sentence).
- **Author sites are a different genre**: full-bleed photo or book cover, a Books nav, an
  Events page, newsletter buttons (Pinker, Barrett, Singer, Ellenberg, Hossenfelder, Mack,
  Lessig, Turkle, Noble, Crawford, Benjamin, boyd). They sell a book, not a researcher.
- **A few designed exceptions worth keeping in view**: Bostrom's grey band with a dated
  note beside Recent additions; Karpathy's vertical timeline of roles with logo tiles;
  Norvig's featured work with a small italic type label per entry; Murphy's whole page in
  one screen; Barak's child's drawing as the portrait; Obermeyer's cream page with a Coffee
  nav item; Lazar's lab site as a terminal; Hinton's nine cards.
