# Handoff — 2026-08-22 — feat/coffee-chat-cal-embed — cal.com inline embed + tile tweak (done, PR open)

## Why / original prompt

Jess disliked the redirect stub page at /coffee-chat ("Taking you to the booking page…") and asked to embed the cal.com calendar directly at jbergs.eu/coffee-chat. Mid-session she also asked the BlueDot tile to mention 5-week cohorts.

## What was done

- Added `@calcom/embed-react`; `src/pages/CoffeeChat.tsx` now renders the inline cal.com embed (calLink `jess-bergs-dnx5up/coffee-chat-with-jess`, light theme, month view) with a back link and a "book directly on cal.com" fallback link. Serves both `/coffee-chat` and `/coffee-chat-with-jess`.
- Removed the two coffee-chat entries from REDIRECTS in `src/prerender.tsx` (no more meta-refresh; `/cv`, `/taisp-tips`, `/tais-reading-recs` still redirect as before).
- Separate commit: BlueDot tile description now says "through 5-week cohorts".
- Verified: build passes, prerendered coffee-chat pages carry no meta refresh, fallback text present. Visual check via vite preview (port 4173) + Playwright CLI screenshot.

## Session context

This session also shipped PRs #32 (coffee-chat short link + button), #33 (BlueDot tile), #34 (tile trim/reposition/image crop/wording) — all merged and live.
