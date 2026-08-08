# Handoff — 2026-08-08 — content/coffee-chat-route — coffee chat route (done, PR open)

## Why / original prompt

Jess: remove https://www.jbergs.eu/workflows; add a route /coffee-chat-with-jess
redirecting to https://cal.com/jess-bergs-dnx5up/coffee-chat-with-jess and add it
to the links list in the header.

## What was done

- Removed /workflows: page component, routes (App.tsx, prerender.tsx), footer
  link; Privacy/Terms back-links now point to "/" as "← jbergs.eu".
- Added /coffee-chat-with-jess via DocRedirect (new optional destinationLabel
  prop → "Taking you to the booking page…"); prerendered with meta-refresh.
- Header nav: "Coffee chat" link between Work and Contact.
- Verified: npm run build clean; dist/ checked for meta-refresh, title,
  header link, no /workflows.

## Decisions

- Kept Privacy/Terms pages (still the workflows app's policies); only unlinked
  /workflows. Flagged in PR that Google OAuth consent screen may still
  reference jbergs.eu/workflows.

## Next action

Jess reviews/merges PR #15: https://github.com/JessBergs/jbergs-portfolio/pull/15
Deploy is `npm run deploy` (gh-pages) — check how this repo normally publishes
after merge.
