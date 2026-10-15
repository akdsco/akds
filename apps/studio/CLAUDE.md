# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

**akdsdesign** is the studio arm of `akds`: websites and automations for
independent London shops and studios. It is deliberately kept **separate from the
personal site** (`akds.dev`, the job-search / engineering portfolio) so the two
audiences never mix. This site sells; `akds.dev` showcases.

- Domain: **akdsdesign.uk** (`SITE_URL` in `lib/site.ts`).
- The one conversion action is **"Book a call"** → a Cal.com link (`BOOKING_URL`).
  The booking flow stays off this static site on purpose. **The link is a
  placeholder** (`https://cal.com/akds/intro`) until the real Cal.com handle
  exists.

## Stack

Same toolkit as `akds.dev`, so the two stay visually consistent:

- **Next.js 16** App Router, **Turbopack**, **static export** (`output: "export"`).
- **TypeScript** total-strict, **Tailwind v4**, **next-themes** (`attribute="class"`).
- **Vitest + Testing Library** (jsdom), **ESLint** strict + **Prettier**.
- Deployed on **Cloudflare Pages** (build `npm run build`, output `out/`, `NODE_VERSION=24`).

```bash
npm run dev / build / start
npm run lint / typecheck / test
npm run format         # prettier --write .
```

## Design system

The palette and look are **ported from akds.dev's design system** (`/ds` there):

- `app/theme.css` holds the semantic tokens (`base/panel/ink/dim/faint/line/chip/brand/hi/hi-soft`),
  mapped into Tailwind via `@theme inline` in `app/globals.css`. Recolour the site
  from `theme.css` alone.
- Build new surfaces against those tokens, not raw colours. When in doubt, the
  canonical reference is the `/ds` page on akds.dev.

## Rules that stay true

- **No em dashes in user-facing copy.** They read as machine-written. Restructure
  with a colon, a full stop, or a comma instead. (Applies to rendered copy, not
  code comments.)
- **Never invent client details or metrics.** `data/work.ts` describes real
  businesses (Jo Hair Studio, Way Cycles). Keep claims honest and let the owner
  chisel wording. No made-up numbers.
- **Pricing numbers in `data/pricing.ts` are a working draft** for the owner to
  tune, not fixed truth.
- **Outbound links go through `ExternalLink`** so `target="_blank"` always ships
  with `rel="noopener noreferrer"`.
- This is an **indexable marketing site** (unlike akds.dev's hidden `/ds`): robots
  allows all, every public route is in the sitemap. Metadata routes
  (`robots.ts`, `sitemap.ts`) must declare `export const dynamic = "force-static"`
  or the export build aborts (`app/static-export-routes.test.ts` guards this).

## Folder structure

```
app/         # routes: / (landing), /pricing, robots.ts, sitemap.ts
components/   # shell (site-nav, site-footer, brand-lockup) + cards (work-card) + ds primitives
lib/          # site config, button classes, cn, wordmark geometry
data/         # work.ts (portfolio), pricing.ts (tiers / care plans / add-ons)
```
