# Handoff — 2026-08-22 — content/bluedot-taisp-tile — BlueDot mentoring tile (done, PR open)

## Why / original prompt

Jess: add a tile for her BlueDot mentoring work as mentor & facilitator on https://bluedot.org/courses/technical-ai-safety-project, covering (1) guiding technical talent to a first impactful AI safety contribution via experiment design/scoping advice, stress-testing assumptions, group sessions and 1:1 check-ins, and (2) selecting standout projects for continued 1:1 support and coaching towards ICML/NeurIPS submissions.

## What was done

- New entry `bluedot-taisp-mentor` in `src/data/projects.json`, placed second (after the SPAR mentorship tile), year 2026, categories Mentorship + AI Security. Her two bullets condensed into the single prose description tiles use.
- Tile image: BlueDot's own og-image for the course page, downloaded and resized to 1200px (`public/images/bluedot-taisp.png`, 612K).
- Verified: `npm run build` passes (zod schema validation) and the tile appears in prerendered `dist/index.html`.

## Next

- Merge PR → auto-deploy via Pages workflow.
