# CLAUDE.md — apps/design (akdsdesign.uk)

Guidance for Claude Code working in **this app**. It lives in a monorepo — the
**root `CLAUDE.md`** covers workspace commands, the shared `@akds/ui` design
system, and the `build/` output convention. Read it first; this file is the
akdsdesign-specific layer.

## What this is

**akdsDESIGN** is the services arm of `akds`: websites and automations for
independent London shops and studios. It is deliberately kept **separate from the
personal site** (`akds.dev`, the job-search / engineering portfolio) so the two
audiences never mix. This site sells; `akds.dev` showcases.

- Domain: **akdsdesign.uk** (`SITE_URL` in `lib/site.ts`).
- The one conversion action is **"Book a call"** → a Cal.com link (`BOOKING_URL`).
  The booking flow stays off this static site on purpose. **The link is a
  placeholder** (`https://cal.com/akds/intro`) until the real Cal.com handle
  exists.

## Stack

Same toolkit as `akds.dev` (shared at the repo root), so the two stay visually
consistent:

- **Next.js 16** App Router, **Turbopack**, **static export** (`output: "export"`,
  `distDir: "build"`).
- **TypeScript** total-strict, **Tailwind v4**, **next-themes** (`attribute="class"`).
- **Vitest + Testing Library** (jsdom), **ESLint** strict + **Prettier** (one root pass).
- Deployed on **Cloudflare Pages**, project `akds-design` (`akds-design.pages.dev`):
  build `npm run build -w apps/design`, output `apps/design/build`,
  `NODE_VERSION=24`.

```bash
npm run dev:design               # from root
npm run build -w apps/design     # static export -> apps/design/build
npm run lint -w apps/design
npm run typecheck -w apps/design
npm run test -w apps/design
```

## Design system

The palette and primitives are the **shared `@akds/ui` design system**
(`packages/ui`), the single source both sites import from — not a copy:

- The semantic tokens (`base/panel/ink/dim/faint/line/chip/brand/hi/hi-soft`) live
  in `@akds/ui`'s `theme.css`, which `app/globals.css` `@import`s and maps into
  Tailwind via `@theme inline`. **Recolour from `packages/ui/src/theme.css`** —
  editing it recolours both sites.
- `cn` and `ExternalLink` also come from `@akds/ui`. Build new surfaces against the
  tokens, not raw colours. The canonical visual reference is the `/ds` page on
  akds.dev.

## Rules that stay true

- **No em dashes in user-facing copy.** They read as machine-written. Restructure
  with a colon, a full stop, or a comma instead. (Applies to rendered copy, not
  code comments.)
- **Never invent client details or metrics.** `data/work.ts` describes real
  businesses (Jo Hair Studio, Way Cycles). Keep claims honest and let the owner
  chisel wording. No made-up numbers.
- **Pricing numbers in `data/pricing.ts` are a working draft** for the owner to
  tune, not fixed truth.
- **Outbound links go through `ExternalLink`** (from `@akds/ui`) so
  `target="_blank"` always ships with `rel="noopener noreferrer"`.
- This is an **indexable marketing site** (unlike akds.dev's hidden `/ds`): robots
  allows all, every public route is in the sitemap. Metadata routes
  (`robots.ts`, `sitemap.ts`) must declare `export const dynamic = "force-static"`
  or the export build aborts (`app/static-export-routes.test.ts` guards this).

## Folder structure

```
app/         # routes: / (landing), /pricing, robots.ts, sitemap.ts
components/   # shell (site-nav, site-footer, brand-lockup), cards (work-card), book-call, kicker
lib/          # site.ts (config), button.ts (button classes)
data/         # work.ts (portfolio), pricing.ts (tiers / care plans / add-ons)
```

`cn` and `ExternalLink` are imported from `@akds/ui` (not local). This app has no
wordmark yet — porting a distinct akdsDESIGN wordmark is tracked in
`docs/TODO.md`.
