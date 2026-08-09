# Handoff — 2026-08-09 — content/about-copy — About rewording (done, PR open)

## Why / original prompt

Jess pasted replacement About copy: para 1 "…research tools that enable…"
with a <break> before a new oversight sentence ("all things human oversight,
and how we can balance this with research automation"); career para "In my
career so far, I've been mainly working in R&D for the public sector…";
generalist para "…through events & conferences…".

## What was done

- About.tsx + index.html noscript updated to the new copy. <break> rendered
  as <br /> inside the same paragraph (matches the hero "(break)" precedent).
- KEPT "Outside work, I design and playtest board games!" — Jess's quoted
  paragraph omitted it, but she only clearly changed "via"→"through";
  flagged for her to confirm rather than silently deleting.
- Build verified: all new phrasings present (React + noscript variants),
  zero hits for old wordings.

## Next action

Jess confirms board-games sentence stays/goes, merges the PR.
