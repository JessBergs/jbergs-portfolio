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

## Follow-up (same session)

- About + noscript sentence replaced: "Currently, I'm focusing on how we
  can balance Research Automation with Scalable Human Oversight…" → "I'm
  currently working on human oversight for automated R&D to keep humans
  meaningfully in the loop." Verified in dist (2 occurrences, old copy gone).
- Mentoring sentence: now "BlueDot Impact's Technical AI Safety Project
  programme" (link on Technical AI Safety Project → bluedot.org/courses/
  technical-ai-safety-project, no bare bluedot.org link) and "Algoverse AI
  Research". Updated About.tsx + noscript; verified in dist.
