# growthnation code factory metric

- Date: 2026-10-21 10:22
- Branch: growthnation-code-factory-on-landing-page-has-no-metric

## Tickets

<!-- The ticket(s) this plan's PR RESOLVES vs merely REFS (coordination). Paste the
     Notion URL(s); the machine keys on the UUID in the URL. /ship links the PR +
     marks In progress; /cleanup closes Resolves to Done on merge. Refs are never
     auto-closed. The TB-xx label is optional human sugar. -->

- Resolves: https://app.notion.com/p/GrowthNation-code-factory-on-landing-page-has-no-metric-40015f963d1381f0947ccd21da2dd79b
- Refs:

## Problem / Context

TB-213. The GrowthNation entry in the akds.dev experience timeline
(`apps/portfolio/data/portfolio.ts`, `experience[GrowthNation].highlights[0]`)
mentions setting up the "code factory" with the CTO but states no impact. The CV
(`automation/src/job-hunt/data/master-cv.yml`, bullet `b-growthnation-codefactory`)
now carries the metric: "cutting engineering cost 30%+". The About intro on the
same page (`about.paragraphs[1]`) already says "more than 30%"; only the
experience entry is missing it.

Current highlight (also clunky: "SME's", run-on, two ideas in one bullet):

> Joined during the initial product build for marketing function, helping SME's
> and Agencies streamline their AIO/SEO tactics, I built user auth, custom
> integrations and setup "code factory" workflow with the CTO to enable build
> contributions from all team members (product/design)

## Behaviours (Given / When / Then)

- B1. Given the GrowthNation entry on akds.dev, when viewed, then a highlight
  states the code factory's quantified impact (more than 30% engineering-cost
  reduction).
- B2. Given the landing page and the CV compared on the code-factory claim, then
  the framing is consistent: same contributors (designer + junior dev), same
  mechanism (skills, plans, automated gates), same metric (30%+). No em dashes
  (site copy rule), so the CV's dash becomes a colon.

## Plan

Owner decision: keep the existing highlight verbatim (the site carries as much
detail as possible; no split, no rewording) and only append
`, cutting engineering cost by more than 30%`. Matches the CV metric and the
About paragraph ("more than 30%").

## Increments (test-first)

1. test (`data/portfolio.test.ts`): GrowthNation has a highlight mentioning the
   code factory that states `cutting engineering cost by more than 30%`, and the
   About intro carries the same figure (B1, B2) → red against current copy.
   impl: append the metric to the existing highlight → green. One commit.

Gate: `npm run lint && npm run typecheck && npm run test` (root fan-out),
`npm run format:check`.

2. Owner follow-up: split the code factory into its own bullet and order the
   GrowthNation highlights chronologically (initial build incl. WordPress
   integration + auth → code factory → bug triage → pivot → Proof Library →
   LLM tagging). test: index order of the bullets → red; impl: reorder → green.

## Plan-quality gate

- Reality recon: N/A (pure copy change inside a known codebase; CV source read
  directly above).
- Safe path default: N/A (no safe/dangerous axis).

## Out of scope / risks

- CV itself (owned by `automation`); About paragraph (already has the metric).
- Risk: copy is owner's voice. Wording above is a proposal for sign-off.

## Notes
