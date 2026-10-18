# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

An **npm-workspaces monorepo** for the `akds` family of sites. Two apps share one
design system so their look cannot drift.

```
apps/
  portfolio/   # akds.dev — the personal engineering portfolio (job search). Showcases.
  design/      # akdsdesign.uk — the akdsDESIGN services site (web + automations). Sells.
packages/
  ui/          # @akds/ui — the SHARED design system (single source of truth)
docs/          # plans (docs/plans), ephemeral ship ledger (gitignored)
```

Each app has its own `CLAUDE.md` with its domain rules — **read the one for the
app you are working in** (`apps/portfolio/CLAUDE.md`, `apps/design/CLAUDE.md`).
This root file covers only what is true across the whole repo.

## The design system is `@akds/ui` — do not re-copy it

`packages/ui` is the **single source of truth** both apps import from, so the
palette and shared primitives can never diverge between the two sites. It owns:

- **`src/theme.css`** — the semantic colour tokens
  (`base/panel/ink/dim/faint/line/chip/brand/hi/hi-soft`). Each app's
  `app/globals.css` `@import`s it by relative path and maps it via `@theme inline`.
  **Recolour either site by editing this one file.**
- **`cn`** (the `clsx`+`tailwind-merge` helper), **`ExternalLink`** (+
  `proseLinkClass` / `iconLinkClass`), and the brand **icons**
  (`GithubIcon` / `LinkedinIcon`). Both apps import these from `@akds/ui`.

Rules:

- **Never copy a token or shared primitive into an app.** Add or change it in
  `packages/ui` and import from `@akds/ui`. Copying is exactly the drift this repo
  exists to prevent.
- Each app sets `transpilePackages: ["@akds/ui"]` (Next compiles the package's TS
  source — there is no build step) and a vitest `@akds/ui` → source alias.
- **Each app's `app/globals.css` must `@source "../../../packages/ui/src"`.**
  Tailwind v4 does not scan `node_modules`, so without it any utility used ONLY in
  a shared primitive (e.g. `ExternalLink`'s `decoration-dotted`) is never
  generated and that element renders unstyled — a silent CSS regression the build
  does not fail on. A per-app `shared-ui-source.test.ts` guards the directive.
- The **wordmark is intentionally NOT shared**: it is brand-specific and the two
  sites' wordmarks are meant to differ. The portfolio owns its wordmark locally.

## Commands

Run from the repo root. The root `lint` / `typecheck` / `test` / `build` scripts
**fan out across every workspace** (`--workspaces --if-present`), so one command
covers both apps:

```bash
npm run build       # static export of every app -> apps/<app>/build
npm run lint        # eslint, both apps (--max-warnings=0)
npm run typecheck   # tsc --noEmit, both apps
npm run test        # vitest run, both apps
npm run format      # prettier --write .   (ONE pass at the root, all files)
npm run format:check

npm run dev:portfolio   # = npm run dev -w apps/portfolio
npm run dev:design      # = npm run dev -w apps/design
```

Target a single app with `-w`, e.g. `npm run test -w apps/design`.

## Output: `build/`, not `out/`

Every app exports to its own **`build/`** directory (set with `distDir: "build"`
under `output: "export"`). The deployable artifact for any app is always
`<app>/build`. There is no root copy step or shim.

## Deploy (Cloudflare Pages)

Each app is its own Cloudflare Pages project, built from this one repo:

- **apps/portfolio → akds.dev** (project `akds-portfolio`): build command
  `npm run build -w apps/portfolio`, output dir `apps/portfolio/build`,
  `NODE_VERSION=24`. See `apps/portfolio/CLAUDE.md`.
- **apps/design → akdsdesign.uk** (project `akds-design`): build
  `npm run build -w apps/design`, output `apps/design/build`, `NODE_VERSION=24`.
  See `apps/design/CLAUDE.md`.

Production only moves when a merge to `main` lands. Branches and PRs get Pages
preview URLs only.

## ⚠ Next.js 16 — likely newer than your training data

Both apps use **Next.js 16** (Turbopack default; `params`/`searchParams` are
`Promise`s; `fetch()` is not cached by default; `next lint` removed; `middleware`
renamed `proxy`). Before writing non-trivial Next-specific code, **read the
relevant guide in `node_modules/next/dist/docs/`** rather than guessing.

## Shared engineering conventions

- **TypeScript total-strict** (`strict` + `noUncheckedIndexedAccess` +
  `noImplicitOverride`), **ESLint** strict + type-aware (`--max-warnings=0`),
  **Prettier** with `prettier-plugin-tailwindcss` (one root pass).
- **Vitest + Testing Library** (jsdom), tests colocated as `*.test.ts(x)`.
- **npm**, no `src/` directory, `@/*` import alias within each app.
- **Node 24 LTS** pinned via the root `.nvmrc` (CI and Cloudflare both use it).
- Tooling shared at the root: `.nvmrc`, `.prettierrc`/`.prettierignore`,
  `.claude/`, `.mcp.json`. CI (`.github/workflows/ci.yml`) runs the root fan-out.

Pending work goes in a `docs/TODO.md` (per app) or a plan under `docs/plans/`,
never in a `CLAUDE.md` — these files are loaded every session, so they are for
rules that stay true, not state that goes stale.
