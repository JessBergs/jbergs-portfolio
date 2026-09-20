# Handoff — 2026-09-20 — content/lateral-tile-logos — Lateral tile: partner logos, first sentence dropped (PR open)

## Why / original prompt

Jess, after merging PR #43: "you can remove the first sentence, as that's already stated on the slide. in the tile include the kairos and bluedot and constellation logos" and "make a new preview for me".

## What was done

- Copy: opening sentence shortened to "Three-day workshop in Berkeley for experienced professionals moving into AI safety." (Jess: first removed it, then asked for this shorter form).
- Logos fetched from lateralworkshop.org (`partner_logos/kairos.png`, `partner_logos/bluedot_dark.svg`) and constellation.org (2025 cropped SVG). Three previews at `~/dev/reports/lateral-tile-previews/v2/` (served on port 8111 at /v2/): C1 colour logos on cream panel, C2 dark-pine on panel, C3 dark-pine no panel; round 2 after Jess asked for brand colours with a feathered white background or top placement: C4 colour + feathered glow bottom, C5 colour top right no glow, C6 colour top right light glow; round 3: C7 = C4 with wider feather and BlueDot recoloured to bluedot.org button blue #1144cc (Jess: "use the blue on the buttons") (default in PR).
- Tile JPEG re-exported from C7. C1–C6 and the logo-free C exported as JPEG backups under `docs/assets/lateral-workshop-tile-candidates/` with the script and logo sources; README updated.

## Next

- Jess picks a variant; if not C7, re-export from the chosen PNG over `public/images/lateral-workshop-2026.jpg`. Merge, remove worktree `l.worktrees/jbergs-portfolio-lateral-logos`, stop the 8111 preview server (pid 714024) once no longer needed.

## Also in this PR

- BlueDot TAISP tile (`bluedot-taisp-mentor`): removed the "advising on experiment design and scoping, stress-testing assumptions, and driving projects to completion" clause; "Standout projects ..." sentence kept.
