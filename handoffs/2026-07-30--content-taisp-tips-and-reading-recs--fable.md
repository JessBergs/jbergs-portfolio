# Handoff — 2026-07-30 — content/taisp-tips-and-reading-recs — TAISP pages (in progress)
## Why / original prompt
Jess asked to host two of her Google Docs as pages on jbergs.eu:
- "Jess' TAISP Tips" (doc 1VIXrgibCpWo...) at /taisp-tips
- "Jess' Reading Recommendations" (doc 16mgteN0F91w...) at /tais-reading-recs
Approach: static snapshot of doc content converted to styled React pages matching site idiom (Workflows.tsx pattern), routes + prerender entries, PR to main (CI deploys on merge).

## Done
- Snapshotted both docs (Google Docs md export, 2026-07-30) into styled pages: src/pages/TaispTips.tsx, src/pages/TaisReadingRecs.tsx (Workflows.tsx idiom).
- Routes added in App.tsx; prerender.tsx: PRERENDER_LINKS + titles. Build verified: 6 pages prerendered incl. both new ones.
## Decisions (recorded in PR too)
- Static snapshot, not live-fetch/iframe. Content updates require re-syncing from the docs.
- Rough draft fragments in tips doc ("Issues w inspec tevals bugs", "louis" etc.) synthesised into one readable paragraph — flagged for Jess's review.
- Tips page links internally to /tais-reading-recs (instead of the Google Doc), and vice versa.
## Next
- PR open, awaiting Jess review; merge to main triggers deploy.yml.
