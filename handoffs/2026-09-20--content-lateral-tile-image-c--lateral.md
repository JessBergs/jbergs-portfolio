# Handoff — 2026-09-20 — content/lateral-tile-image-c — Lateral tile: image C, dates dropped (done, PR open)

## Why / original prompt

Jess, after merging PR #42: "remove the dates in the copy. use image C but keep the others you prepared as backup in the repo".

## What was done

- `src/data/projects.json`: removed "(11–13 September 2026)" from the `lateral-workshop-2026` description. Nothing else in the copy changed.
- `public/images/lateral-workshop-2026.jpg`: re-exported from variant C (site social preview, watercolour + wordmark), progressive JPEG q90, 1200×675. The image itself still carries "Berkeley, CA · 11–13 September 2026" as Jess chose it that way.
- Backups A, B, D exported as JPEG into `docs/assets/lateral-workshop-tile-candidates/` with `make_tiles.py` and a README. Not under `public/`, so not deployed.
- Source previews remain at `~/dev/reports/lateral-tile-previews/` on the VM (untracked).

## Next

- Jess reviews/merges; Pages deploys from main. Remove worktree `l.worktrees/jbergs-portfolio-lateral-tile-c` after merge.
