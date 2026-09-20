# jbergs-portfolio — agent instructions

Jess's personal portfolio site: React 19 + TypeScript + Vite 6, Tailwind v4,
React Router 7. `Readme.md` covers the stack and the npm scripts; this file
covers what the repo does not say out loud.

> Global rules also apply. Session-wide conventions (worktrees-and-branches,
> async-by-default, context-loading-protocol, contacting-jess, …) live in the
> master `~/.claude/CLAUDE.md` and its notes index, from
> [`JessBergs/dotfiles`](https://github.com/JessBergs/dotfiles).

## Session start

1. Read the newest 1–3 files in `handoffs/` relevant to your branch.
2. Read `docs/REQUESTS.md` — the append-only log of Jess's asks. A new feature
   request gets a timestamped entry **before** you build it.

## `main` is production

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
Work on a branch in a worktree and integrate via PR — a merge here is a release.

## Build

`npm run build` is `tsc && node scripts/build.mjs`, not `vite build`. The extra
script exists so prerendering (`vite-prerender-plugin` + `src/prerender.tsx`)
emits a shared vendor chunk that both the prerender entry and the runtime
bundle import. Its header comment records a past breakage from deleting that
chunk — keep everything Vite emits as-is.

## Conventions

- **Content lives in data, not components.** Projects render from
  `src/data/projects.json` (shape in `src/types/Project.ts`, checked by
  `scripts/validate-projects.ts`). Add a project by editing the JSON.
- **Tailwind v4 is CSS-first.** There is no `tailwind.config.js`; theme tokens
  and the self-hosted Charter font faces live in `src/index.css`.
- **`src/components/ui/` is shadcn/ui** (`components.json`, neutral base, CSS
  variables). Those are generated primitives — extend them through the
  wrappers in `src/components/`, and import via the `@/` aliases.
- Routes are pages under `src/pages/`, wired up in `src/App.tsx`.
