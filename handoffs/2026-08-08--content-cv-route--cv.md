# Handoff — 2026-08-08 — content/cv-route — CV route + hero/footer tweaks (done, PR open)

## Why / original prompt

Jess (three follow-ups in one session):
1. Add jbergs.eu/cv redirecting to her CV Google Doc
   (doc id 1pFuWez08mhMMGp9NBi0TfemA9tonkY_ESp4qmpFv550), NOT linked from the
   profile page.
2. Footer: only keep 'Contact'.
3. Coffee chat link: not in the top header — among the bits under her name
   (hero list), linking directly to cal.com (avoid the redirect interstitial).

## What was done

- /cv route via DocRedirect (App.tsx, prerender.tsx links/titles/redirects,
  new src/pages/Cv.tsx). No on-site link to it.
- Footer: removed LinkedIn + Google Scholar, kept Contact.
- Header: removed the "Coffee chat" nav item (added earlier in PR #15).
- Hero: added "Coffee chat" item (Coffee icon) under the name, direct link to
  https://cal.com/jess-bergs-dnx5up/coffee-chat-with-jess, target _blank.
- Kept the /coffee-chat-with-jess route as a shareable URL (from PR #15);
  on-site links no longer go through it.
- Verified: build clean (7 prerendered pages), dist/cv has meta-refresh +
  title, homepage has zero /cv and /coffee-chat-with-jess links, footer has
  only Contact.

## Next action

Jess reviews/merges the PR; GitHub Pages deploys automatically on merge.
