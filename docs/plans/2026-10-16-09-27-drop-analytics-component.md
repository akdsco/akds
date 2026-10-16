# Drop the redundant CloudflareAnalytics component

## Tickets

Resolves:
Refs:

(No Notion ticket; a small cleanup surfaced after the monorepo merge.)

## Problem

akds.dev already has Cloudflare Web Analytics running via the dashboard's
**Automatic setup** (edge-injected beacon, collecting real data). The in-repo
`apps/portfolio/components/cloudflare-analytics.tsx` renders its own beacon only
when `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` is set — that var is unset, so the component
ships nothing today. It is therefore **dead code and a trap**: if anyone ever set
that token, the page would carry TWO beacons (automatic + component) and
double-count every visit.

## Decision

Remove the component, its mount, and its test. Analytics stays on, unchanged,
served by Cloudflare's Automatic setup. Nothing about the rendered site changes
(the component already rendered `null` in production without the token).

## Changes

- Delete `apps/portfolio/components/cloudflare-analytics.tsx`.
- Delete `apps/portfolio/components/cloudflare-analytics.test.tsx`.
- `apps/portfolio/app/layout.tsx`: remove the import and the
  `process.env.NODE_ENV === "production" && <CloudflareAnalytics />` mount.
- `apps/portfolio/CLAUDE.md`: drop the analytics-token line from the deploy
  section; note analytics is served by CF Automatic setup (no in-repo beacon).

## Increments (ends green: lint + typecheck + test + build)

1. Remove the component + mount + test, update the CLAUDE.md deploy note. Verify
   the portfolio app lints, typechecks, tests, and builds, and that the built
   HTML carries no beacon (same as before — it never did via this component).

## Out of scope / risks

- Does NOT touch Cloudflare's Automatic setup (that is where analytics lives).
- No behaviour change: production output is byte-equivalent (the component was a
  no-op without the token).
