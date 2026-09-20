# Handoff — 2026-09-20 — content/lateral-copy-tighten — Lateral tile: shorter second clause (PR open)

Jess, after PR #44 shipped: "on what the work involves -humanise and shorten, still too slo[w]".

Changed the tail of the Lateral description from "on what the work involves in practice and how participants' existing experience applies" to "on what the day-to-day looks like and where participants' experience fits". Also moved the logos on the tile image down another 5px (10px below the underlay centre in total); underlay unchanged. Then lifted the baked-in wordmark + tagline + date block 10px (feathered shifted copy in `make_logo_tiles_v4.py`, `TEXT_LIFT`).

Next: merge, remove worktree `l.worktrees/jbergs-portfolio-lateral-copy`.

## Also in this PR: tile tags as filters

Jess: "the tags on the tiles should be selectable jsut like the ones in the filters row". `ProjectCard` now receives `selectedCategories` + `onToggleCategory`; each tag is a `span[role=button]` (the card may be an `<a>`, so a nested `<button>` is avoided; click/Enter/Space call preventDefault + stopPropagation so the card link isn't followed). Active tags use `.project-card__tag--on`, styled like `.filter-pill--on`. Logged in `docs/REQUESTS.md` (new file). No local typecheck (no node_modules on the VM; CI builds on merge to main), so watch the deploy run after merging.
