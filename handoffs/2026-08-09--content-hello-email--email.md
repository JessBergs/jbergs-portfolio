# Handoff — 2026-08-09 — content/hello-email — email change (done, PR open)

## Why / original prompt

Jess: change contact@jbergs.eu to hello@jbergs.eu.

## What was done

- Hero.tsx (mailto + visible text) and Footer.tsx (mailto) now use
  hello@jbergs.eu. info@jbergs.eu on the Privacy/Terms pages left untouched
  (different address, not in scope).
- Build verified: 3× hello@, 0× contact@ in dist/index.html.

## Next action

Jess merges the PR; Pages deploys automatically.
