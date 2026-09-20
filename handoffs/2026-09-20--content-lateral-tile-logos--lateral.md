# Handoff — 2026-09-20 — content/lateral-tile-logos — Lateral tile: partner logos, first sentence dropped (PR open)

## Why / original prompt

Jess, after merging PR #43: "you can remove the first sentence, as that's already stated on the slide. in the tile include the kairos and bluedot and constellation logos" and "make a new preview for me".

## What was done

- Copy: first sentence removed; description now starts "Invited as one of the workshop's experts, ...".
- Logos fetched from lateralworkshop.org (`partner_logos/kairos.png`, `partner_logos/bluedot_dark.svg`) and constellation.org (2025 cropped SVG). Three previews at `~/dev/reports/lateral-tile-previews/v2/` (served on port 8111 at /v2/): C1 colour logos on cream panel (default in PR), C2 dark-pine logos on panel, C3 dark-pine logos no panel.
- Tile JPEG re-exported from C1. C2/C3 and the logo-free C exported as JPEG backups under `docs/assets/lateral-workshop-tile-candidates/` with the script and logo sources; README updated.

## Next

- Jess picks C1/C2/C3; if not C1, re-export from the chosen PNG over `public/images/lateral-workshop-2026.jpg`. Merge, remove worktree `l.worktrees/jbergs-portfolio-lateral-logos`, stop the 8111 preview server (pid 714024) once no longer needed.
