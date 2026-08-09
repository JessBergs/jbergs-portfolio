# Handoff — 2026-08-09 — content/hero-title — job title update (done, PR open)

## Why / original prompt

Jess: update title to "R&D Engineering Lead" (break) "Human-AI Interaction @
UK AI Security Institute".

## What was done

- Hero.tsx subtitle: now "R&D Engineering Lead" / "Human-AI Interaction @ UK
  AI Security Institute" (order flipped from before, AISI spelled out).
- Kept index.html metadata consistent: meta description, og:description,
  JSON-LD jobTitle, and the noscript fallback all now say "R&D Engineering
  Lead" (was "R&D Software Engineer"); reworded "Lead leading" → "Lead for".
- Build verified; all five occurrences confirmed in dist/index.html.

## Next action

Jess merges the PR; Pages deploys automatically. PR #17 (coffee chat label)
was still open when this branched — no conflict (different Hero.tsx lines).
