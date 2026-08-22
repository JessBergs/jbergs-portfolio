# Handoff — 2026-08-22 — feat/coffee-chat-short-link — shareable coffee-chat links (done, PR open)

## Why / original prompt

Jess: wants shareable links `jbergs.eu/coffee-chat` and `jbergs.eu/coffee-chat-with-jess` that forward to the cal.com booking page without being real pages, and the homepage coffee-chat button should use the site link instead of the raw cal.com URL.

## What was done

- `/coffee-chat-with-jess` already existed as a prerendered redirect (DocRedirect + meta-refresh via `src/prerender.tsx`); added `/coffee-chat` as an alias to the same cal.com URL in `prerender.tsx` (PRERENDER_LINKS, TITLES, REDIRECTS, route) and `App.tsx`.
- Hero button href changed from the cal.com URL to `/coffee-chat`.
- Verified local build: `dist/coffee-chat/index.html` and `dist/coffee-chat-with-jess/index.html` both carry `<meta http-equiv="refresh" content="0;url=https://cal.com/...">`; homepage carries `href="/coffee-chat"`.

## Constraint noted

GitHub Pages cannot serve true HTTP 30x redirects for arbitrary paths — the forward is an instant meta-refresh + `location.replace` in the prerendered stub (same pattern as `/cv`). Visitors normally never see the fallback text.

## Next

- Merge PR → deploy workflow publishes automatically on push to main.
