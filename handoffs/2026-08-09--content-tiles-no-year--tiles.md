# Handoff — 2026-08-09 — content/tiles-no-year — tiles + oversight sentence (done, merged)

## Why / original prompt

Jess: (1) remove year numbers from project tiles; (2) oversight sentence →
"I'm currently working on meaningful human oversight mechanisms for our
increasingly automated research workflow." (singular, as written).

## What was done

- Projects.tsx: dropped the project-card__year span (year data kept in
  projects.json for easy revert).
- About + noscript sentence updated. Build verified (2× new copy, 0 year
  spans). Merged on instruction.
