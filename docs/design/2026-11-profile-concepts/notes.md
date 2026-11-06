# Homepage concepts, round three (November 2026)

Round one moved the same tiles around; round two replaced the tile with cards, stamps and
charts. Both were rejected. The brief for this round was to look at how PhD students,
postdocs and professors actually build their homepages and start from there, with
kjfeng.me named as the one that is right.

The thirty pages looked at, and what each does, are in
`../2026-11-reference-profiles/` (captures local only, notes in its README). The genre is
consistent: a small photo and a prose bio, work as a thumbnail list, dates typeset quiet,
upcoming things as a short dated list, mentoring and service as sections, one device that
carries the personality, a last-updated line.

## What stays from the site

Charter throughout, the paper colour, the five pastels of the frame as the five kinds of
work (talk, research, mentoring, organising, judging), the portrait that was already in
`public/images` but never used, and the existing tile images at small sizes.

## The five

| | Anchored in | What it does with the brief |
|---|---|---|
| A · Two columns | kjfeng.me (Feng); also Barron, Litt | The academic default done carefully. Upcoming is a dated list straight after the bio, so it is on the first screen without a separate block. Six selected works, then an "everything" link, so the list cannot sprawl. |
| B · Lab page | hci.stanford.edu/msb (Bernstein); also Froehlich, Liao | The sidebar is the "now" column: photo, contact, talks and events, mentoring, service, coffee chats. The record is complete and by year, so adding twenty more entries is just more rows. |
| C · Year grid | dragice.fr (Dragicevic); also Litt's archive band | Keeps tiles, which Jess likes, and solves the growth problem the way Dragicevic does: small tiles, year written above the first tile of each year, an archive band for older work. "Next" is the first row with dates in the same position as years. |
| D · Connected | mariandoerk.de (Dörk) | Shows what the tiles never could: which interests each piece of work serves and which organisation it was for. Lines are drawn after layout; hovering an interest or organisation isolates its lines. |
| E · Four views | kimalbrecht.com (Albrecht) | One record, four views. Tiles for people who like tiles, list for people who want density, timeline for the shape of the career, cv for roles. Upcoming leads every view. |

## Checks against the usual generated-page defaults

- No cream-and-terracotta pairing, no dark page with an acid accent, no hairline broadsheet.
- All-caps tracked labels appear only in B and D, where the reference pages themselves use
  them (Bernstein, Dörk). A and C use sentence-case headings; E has none.
- No cards with uniform shadows; C's tiles have a one-pixel line, E's tiles mirror the live
  site's existing card.
- No motion on load. The only motion is D's hover isolation and E's view switch, both
  answers to an action.
- Link colour is the sky pen everywhere, so blue means "goes somewhere" and the other four
  inks keep their meaning.

## Open items

- Liftoff and SASH venues, the NeurIPS social date, and the GCP expansion are placeholders.
- `UPDATES` in `entries.js` is written from the existing projects; it would be edited by
  hand on the real site.
- The portrait is the selfie from `public/images/profile.png`; A desaturates it, the
  others leave it as it is. A proper headshot would help all five.
- D draws lines for all twenty entries. On the real site the archive could be collapsed so
  only the current work is wired.
