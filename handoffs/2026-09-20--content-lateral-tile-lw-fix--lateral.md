# Handoff — 2026-09-20 — content/lateral-tile-lw-fix — Lateral tile: ghosted L/W fixed (merged)

Jess spotted ghosting on the left stems of "L" and "W" in the wordmark after the 10px text lift (PR #45). Cause: the feathered edge of the lift zone in `make_logo_tiles_v4.py` started at x=758, right on the L's stem, so lifted and unlifted glyph edges blended. Fix: lift box now starts at x=700 so the feather sits in empty haze. Re-exported the tile.

Next: remove worktree `l.worktrees/jbergs-portfolio-lateral-lw-fix` after merge.
