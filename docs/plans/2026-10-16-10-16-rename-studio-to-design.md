# Rename apps/studio -> apps/design (match the akdsDESIGN brand)

## Tickets

Resolves:
Refs:

(No Notion ticket; a naming-consistency cleanup.)

## Problem

The services app is the **akdsDESIGN** brand (domain akdsdesign.uk, upcoming
Cloudflare project `akds-design`), but the folder is `apps/studio` and the
package is `@akds/studio`. Three external names say "design", the code says
"studio" — avoidable friction. The original `design` collision worry was weak:
the design SYSTEM package is `@akds/ui`, not `design`, so `apps/design` clashes
with nothing.

Good timing: the studio Cloudflare project does not exist yet, so renaming now
costs nothing on Cloudflare.

## Decision

Rename the folder `apps/studio -> apps/design` and the package
`@akds/studio -> @akds/design`, and update every identifier reference
(`dev:studio` script, `-w apps/studio` in docs, CI comment, per-app CLAUDE.md).
The portfolio app stays `apps/portfolio` (its brand is "akds" = the repo name, so
a role name is correct there).

## Changes

- `git mv apps/studio apps/design`; `@akds/studio -> @akds/design` in its
  package.json.
- root `package.json`: `dev:studio -> dev:design` (`-w apps/design`).
- root `CLAUDE.md`, `apps/portfolio/CLAUDE.md`, `apps/design/CLAUDE.md`,
  `.github/workflows/ci.yml`: `apps/studio -> apps/design`, `dev:studio ->
  dev:design`, header + diagram wording.
- regenerate the root lockfile (`npm install`).

## Increments (ends green: both apps lint + typecheck + test + build)

1. Move the folder + rename the package + update all identifier references +
   regenerate the lockfile. Verify both apps are green and no `apps/studio` /
   `@akds/studio` reference remains (outside historical plan files).

## Out of scope / risks

- Config paths (`next.config.ts` turbopack root, vitest `@akds/ui` alias,
  globals.css `@source`) are relative to the app dir, so the move does not change
  them (apps/design is still two levels from packages/ui).
- No app imports `@akds/studio`, so no import rewrites are needed.
- Historical `docs/plans/*` keep the old name (point-in-time records).
