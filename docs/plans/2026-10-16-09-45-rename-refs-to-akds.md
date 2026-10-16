# Update repo-name references after the GitHub rename to `akds`

## Tickets

Resolves:
Refs:

(No Notion ticket; follows the owner renaming the GitHub repo
`akds-portfolio-2026` -> `akds` to match the monorepo + root package name.)

## Problem

The GitHub repo was renamed `akds-portfolio-2026` -> `akds` (same owner; old URLs
redirect; local remote already repointed). A few tracked docs still name the repo
`akds-portfolio-2026`.

## Decision

Update only the references that name the **repo identity**. Leave references to
the Cloudflare Pages **project** name (still `akds-portfolio-2026`), the local
path, the historical plan files, and the design-artifact zip filename — those are
unchanged and correct.

## Changes

- `apps/portfolio/CLAUDE.md`: Git-connected repo is now `akdsco/akds`; note the
  Cloudflare project name stays `akds-portfolio-2026` (project name != repo name).
- `.claude/ts-code-review.rules.md`: title `Repo rules — akds`.
- `apps/portfolio/README.md`: retitle to describe the portfolio app in the `akds`
  monorepo (it was a bare repo-name title).

## Increments

1. Edit the three doc references. Doc-only; verify the suite still passes and no
   stale repo-identity reference remains.

## Out of scope

- Not renaming the Cloudflare Pages project or the local directory (optional,
  owner-gated).
