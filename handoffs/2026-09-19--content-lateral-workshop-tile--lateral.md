# Handoff — 2026-09-19 — content/lateral-workshop-tile — Lateral Workshop tile (done, PR open)

## Why / original prompt

Jess: add a tile for the Lateral Workshop (https://www.lateralworkshop.org/, Berkeley, 11–13 Sep 2026), where she was one of the invited experts. Key visual: the speaker line-up with her face among well-known AI safety people; Berkeley watercolour background as an alternative. She asked for image previews before choosing.

## What was done

- Four 16:9 candidates generated with Pillow from the workshop site's own assets (speaker headshots, Berkeley watercolour, palette and fonts from its theme CSS). Previews + generator: `~/dev/reports/lateral-tile-previews/` (VM). Jess's iterations: no highlight ring on her face, Berkeley + dates in every graphic, no name-dropping in image or copy.
- Variant B (hero row of five, Jess centre, Berkeley behind) chosen as the default by the agent because Jess asked for the PR before picking; swapping is a one-file change (re-export another variant over `public/images/lateral-workshop-2026.jpg`).
- New entry `lateral-workshop-2026` inserted first in `src/data/projects.json`; copy iterated with Jess (title "Expert Invitee", humanized second sentence). Categories: Public Speaking, Mentorship, AI Security.
- Image exported as progressive JPEG q90, 1200×675, ~205 KB.
- Verification: JSON parsed and checked against the zod rules with a local script; image path exists. Full `npm run build` NOT run on the VM (heavy-commands rule 0); the deploy workflow builds on merge to main.

## Next

- Jess reviews PR; if she prefers A, C or D, re-export from `make_tiles.py` and replace the JPEG.
- Merge → Pages deploy. Stop the preview server on port 8111 afterwards.
