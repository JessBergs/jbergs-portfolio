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

## Follow-up (same session)

- Career sentence (About + noscript): now "My career so far has centred on
  R&D for the public sector, spanning EU Horizon R&D projects to Explainable
  AI at BBC R&D and since 2024 technical AI safety in the British
  government." Verified in dist (2 occurrences, old copy gone).
