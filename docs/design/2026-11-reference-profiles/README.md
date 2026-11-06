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
