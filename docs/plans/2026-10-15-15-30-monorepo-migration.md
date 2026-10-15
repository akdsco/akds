# Monorepo migration: akds.dev + akdsdesign share one design system

## Tickets

Resolves:
Refs:

(No Notion ticket; arose from the akdsdesign build conversation.)

## Problem

`akdsdesign` was scaffolded by copying `theme.css` + primitives out of
`akds-portfolio-2026`. Two repos with copied design tokens will drift. The owner
wants one source of truth for the design system across a growing family of sites
(akds.dev, akdsdesign, and more to come: blog, Neato, further client sites).

## Decision

**Restructure `akds-portfolio-2026` in place into an npm-workspaces monorepo** and
fold `akdsdesign` in as a second app. In-place (not a fresh repo) keeps akds.dev's
git history and, crucially, its existing Cloudflare Pages connection, so the live
site is disturbed as little as possible. The repo can be renamed `akds` later
(cosmetic; GitHub redirects, Cloudflare tracks by id).

## Target structure

```
akds-portfolio-2026/            (repo root; rename to `akds` later, optional)
├─ apps/
│  ├─ portfolio/  ← all current akds.dev files, imports intact (= akds.dev)
│  └─ studio/     ← akdsdesign (from ~/Projects/akdsdesign) (= akdsdesign.uk)
├─ packages/
│  └─ ui/         ← SINGLE SOURCE: theme.css, cn, ExternalLink, Wordmark (+geometry), icons
├─ package.json (workspaces: apps/*, packages/*)
├─ .github/workflows/ci.yml (builds/tests both apps)
└─ docs/ (plans, ship ledger)
```

Names locked with the owner: `apps/portfolio` (akds.dev) + `apps/studio`
(akdsdesign.uk). `design` was rejected as an app name because `packages/ui` IS
the design system — an `apps/design` next to it reads as a collision.

## Build output: `build/`, standardised, no shim

Every app exports to its own `build/` directory (not `out/`), set natively with
`distDir: "build"` in each `next.config.ts` (verified: the static export lands in
`build/`, the `.next` cache stays separate). No root copy shim, no gimmick. The
deployable output for any app in the repo is always `<app>/build`.

## Prod safety

- **All work on the `monorepo` branch.** akds.dev production builds from `main`,
  so it is untouched until the owner merges. Nothing here deploys.
- **akds.dev Cloudflare settings change once, on merge** (owner applies, it is
  their call and they asked for it done properly): build command
  `npm run build -w apps/web`, output directory `apps/web/build`. `NODE_VERSION=24`
  and the analytics token stay. `public/_redirects` and `_headers` ship from
  `apps/web/build` as before. The migration branch carries nothing that deploys,
  so prod only moves when the owner merges and flips these two fields together.
- **Studio Cloudflare project is new and deferred** (deploy is "last"): a second
  Pages project, build `npm run build -w apps/studio`, output `apps/studio/build`,
  on the generic `*.pages.dev` domain first.

## Single-source strategy (minimise churn in the live app)

- `packages/ui` owns `theme.css` (the palette, the real drift risk). Both apps'
  `globals.css` import it by relative path.
- `packages/ui` owns `cn`. Owner chose the clean path over a re-export shim: the
  13 `@/lib/utils` import sites in the portfolio app are rewritten to
  `import { cn } from "@akds/ui"` and `lib/utils.ts` is deleted. `components.json`
  (shadcn) `utils` alias is repointed at the package so a future `npx shadcn add`
  stays honest.
- `packages/ui` owns `ExternalLink`/`proseLinkClass`/`iconLinkClass`, `Wordmark`
  + `lib/wordmark` geometry, and `icons`. akds.dev's ~9 import sites are rewritten
  to `@akds/ui` and the local copies deleted (behaviour-preserving: the files are
  identical today). Studio imports from `@akds/ui` directly.
- Each app sets `transpilePackages: ["@akds/ui"]` so Next compiles the shared TS.

## Increments (each ends green: both apps lint + typecheck + test + build)

1. **Skeleton + move portfolio.** Create root workspace `package.json`, move
   every akds.dev app file under `apps/portfolio/` (git mv, imports intact),
   unanchor `.gitignore` for nested apps, fix `notion-config.test.ts` to reach
   the root `.claude/` (two levels up), regenerate the single root lockfile.
   Verify `apps/portfolio` builds and tests exactly as before.
2. **Add studio.** Copy `~/Projects/akdsdesign` content into `apps/studio/`
   (drop its own lockfile/node_modules). Verify it builds + tests.
3. **Extract `packages/ui`.** Move theme.css + primitives in; rewrite `cn`
   imports to `@akds/ui` (delete `lib/utils.ts`, repoint `components.json`) and
   the other primitives to direct `@akds/ui` imports; point both globals.css at
   the shared theme.css; update `lib/theme-css.ts` (+ the `/ds` reader/test) to
   read theme.css from its new `packages/ui` location; set `transpilePackages`.
   Delete the duplicates. Verify both apps.
4. **Root scripts + CI.** Root `lint/typecheck/test/build` fan out across
   workspaces (`--workspaces --if-present`); `distDir: "build"` in each app.
   Prettier runs once at root. Update `ci.yml` to build and test both apps.
   Verify the full suite.
5. **Docs.** Root `CLAUDE.md` (monorepo overview) + per-app notes; update the
   akds.dev CLAUDE.md folder/deploy sections.

## After merge (owner-gated, NOT in this branch)

- Owner merges the PR and, in the Cloudflare dashboard, sets akds.dev's build
  command to `npm run build -w apps/web` and output dir to `apps/web/build`.
- Retire the standalone `akdsco/akdsdesign` repo + `~/Projects/akdsdesign` (its
  content now lives in `apps/studio`). **Confirm before deleting.**
- Optionally rename the GitHub repo to `akds`.
- Later: create the studio Cloudflare Pages project for the `*.pages.dev` preview.

## Out of scope / risks

- Not deploying studio yet (deferred by the owner).
- akds.dev stays live on `main` until the owner merges and flips the two
  Cloudflare fields; the branch never deploys.
- Risk: Tailwind v4 resolving the shared `theme.css` by relative path across the
  workspace. Verified by an actual build in increment 3, not assumed.
