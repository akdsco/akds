# design system reference

- Date: 2026-10-12 12:28
- Branch: design-system-isn-t-documented-anywhere-future-pages-have-no-canonical-guide-to-build-against

## Tickets

<!-- The ticket(s) this plan's PR RESOLVES vs merely REFS (coordination). Paste the
     Notion URL(s); the machine keys on the UUID in the URL. /ship links the PR +
     marks In progress; /cleanup closes Resolves to Done on merge. Refs are never
     auto-closed. The TB-xx label is optional human sugar. -->

- Resolves: https://app.notion.com/p/akdsco/Design-system-isn-t-documented-anywhere-future-pages-have-no-canonical-guide-to-build-against-3f715f963d1381ceacd3ed4a02e9edaf
- Refs:

## Problem / Context

**TB-192.** The visual language — colour tokens, type scale, spacing, radius,
component treatments and layout patterns — lives implicitly, scattered across
`app/theme.css`, `app/globals.css` and individual components. There is no single
rendered place that shows it as a system, so every new page/concept risks
re-deriving or drifting from the established language, with nothing to check new
work against. The owner intends to keep adding pages; the builder (owner + AI)
needs a canonical reference.

**Done** = a single on-site reference that (a) opens by direct URL, (b) renders
the site's *actual* design system live — not prose about it — and (c) reflects
what the site uses *today* (a true mirror, not a hand-copied snapshot that can
silently diverge). It is **hidden**: no nav entry, no internal links, not in the
sitemap, `noindex`. Static export has no auth, so "hidden" = unlinked + excluded
from sitemap + noindex (not access-controlled — a later ticket can gate it).

It is a **build-time tool**, not recruiter content, and **must not change the
site's existing visual output**.

### Reality recon (done BEFORE increments — codebase is the source of truth)

AC #3 ("true mirror, not stale snapshot") makes the *live code* the external
reality this must track, so I read it first rather than describing from memory:

- **Tokens** — `app/theme.css` holds **10 semantic CSS vars** (`--base --panel
  --ink --dim --faint --line --chip --brand --hi --hi-soft`) in `:root` (light) +
  `.dark` (dark), each with a documented **role** in the file header. `globals.css`
  maps them to Tailwind via `@theme inline` (`--color-base` …) so `bg-base` etc.
  exist; also a **radius scale** (`--radius-sm…4xl` derived from `--radius`), the
  **fonts** (`--font-sans`/`--font-mono` = Geist Sans/Mono, `--font-heading` =
  sans), the `reveal`/`wordmark-flare`/`scanline` effects, and shadcn's own token
  block. **theme.css is the single source of truth** the reference must mirror.
- **Type scale** actually used on the site: `text-xs sm base lg xl 2xl 4xl 5xl`
  (3xl/6xl unused). `font-mono` dominates (27 uses — the accent voice);
  `font-sans`/`font-heading` sparing. Mono-as-accent is the brand per
  `docs/design-brief.md`.
- **Reusable components**: `components/ui/{button,card}` (button has 6 variants ×
  8 sizes via cva), and bespoke `kicker`, `stack-chips` (+ exported
  `chipClass`/`chipHoverClass`), `pulse-dot`, `external-link` (+ `proseLinkClass`),
  `company-link`, `linked-text`, `wordmark`, `mode-toggle`.
- **Hidden infra already favours safe-by-default**: `app/sitemap.ts` is a **manual
  allowlist** (`["/about","/projects"]` + case studies) — a new route is excluded
  unless *explicitly* added. `app/robots.ts` allows all + points at the sitemap.
  `site-nav.tsx` links are a manual array; `command-palette.tsx` commands are a
  manual `useMemo` list — neither auto-discovers a route. Existing
  `sitemap.test.ts` / `robots.test.ts` / `*.metadata.test.ts` (assert-*absence*) /
  `identity-surfaces.test.ts` (source-scan via `readFileSync`) give the exact test
  patterns to extend.

### Safe-by-default (required gate question)

The dangerous axis = **accidental public exposure** of the hidden page. The safe
path is the **structural default**, not an opt-in knob:

- Sitemap is an explicit allowlist → new route **excluded by default**. Guarded by
  a test asserting the route stays out.
- `noindex` set **on the route's own metadata** (renders `<meta name="robots"
  content="noindex, nofollow">` at build). Guarded by a metadata test.
- **Deliberately NOT** adding the path to `robots.txt` — a `Disallow:` line would
  *publish the secret URL* in a world-readable file (the classic leak). Hidden =
  unlinked + unlisted + noindex, exactly the ticket's definition.
- Guard tests (assert-absence) fail loudly if a future change links it from
  nav / command palette / footer / sitemap — the safe state is enforced, not
  remembered.

### True-mirror strategy (required — AC #3)

Non-drift is achieved three ways, so nothing is a hand-copied snapshot:

1. **Colours paint from the live var** — each swatch's background is
   `var(--<token>)` (via the real Tailwind class), so it shows the *current*
   computed colour; change theme.css and the swatch follows, zero edits here.
2. **Value readout read at runtime** — the oklch string is read from
   `getComputedStyle(documentElement)` client-side (mount-gated; the value differs
   by theme, which would mismatch SSR — follows CLAUDE.md hydration rule #2), so
   the printed value is always real.
3. **Token name-set is test-enforced** — `lib/design-tokens.ts` lists the token
   names + roles; `design-tokens.test.ts` reads `app/theme.css`, extracts the
   `--names` from `:root`, and asserts the list matches **exactly**. Add/remove a
   token in theme.css without updating the reference → red. This is the mirror
   guarantee for the *set* of tokens.
4. **Components render live** — the gallery imports the *real* `Button`, `Card`,
   `Kicker`, `StackChips`, etc. and renders them. No re-implementation to drift.

## Plan

Add a hidden, statically-exported route **`/ds`** (a clear, memorable
URL — not `_`-prefixed, which App Router treats as a private non-route folder)
that renders the live design system as a single scrollable reference, built from
the real tokens + components so it cannot drift, and kept off the public surface.

**Route:** `app/ds/page.tsx` — a server component shell with small
client leaves only where a live DOM read is needed (the colour value readout, the
`ModeToggle` for flipping light/dark in place). Metadata on the route sets
`robots: { index: false, follow: false }` and a plain `<title>`.

**Sections** (each a live render, framed by the site's own `Kicker` header):
1. **Colour tokens** — the 10 semantic roles: swatch (painted via live var) +
   name + role + live oklch value (both themes viewable via the in-page toggle).
2. **Type scale** — the sizes the site uses (`text-xs…5xl`) in Geist Sans, plus
   the mono accent voice (`font-mono`) and `font-heading`, each labelled with its
   class.
3. **Spacing & radius** — the radius scale (`rounded-sm…4xl`, painted live) and a
   representative spacing ramp, each labelled.
4. **Components** — live `Button` (all variants × key sizes), `Card`, `Kicker`,
   `StackChips`, `PulseDot`, `ExternalLink`/`proseLinkClass`, `CompanyLink`,
   `Wordmark`, `ModeToggle`.
5. **Patterns** — the chip, the kicker section header, focus ring, text-selection
   colour, the scanline — the recurring treatments a new page reuses.

The page **styles itself with the real tokens/components**, so it *is* an instance
of the system (dogfood check). No new OG card (inherits root; irrelevant while
noindex). No change to any existing route, token or component — purely additive.

## Behaviours (Given / When / Then — from the ticket's acceptance criteria)

- **B1 (AC#1 — unlinked).** *Given* a visitor browsing akds.dev normally, *when*
  they use the nav or scan any page, *then* there is no visible link/entry point to
  the reference (reachable only by typing the direct URL): it is absent from
  `site-nav`, the command palette, and the footer.
- **B2 (AC#2 — rendered, not prose).** *Given* someone opens `/ds` by
  URL, *when* it renders, *then* it shows the real tokens/scale/spacing/components
  rendered live — real swatches, real components — not a prose description.
- **B3 (AC#3 — true mirror).** *Given* the reference lists the colour tokens,
  *when* `app/theme.css` gains/loses/renames a token, *then* a test fails until the
  reference's token list matches theme.css exactly (name-set can't silently
  diverge); and swatches/values are read from the live var, not copied literals.
- **B4 (AC#4 — off the public surface).** *Given* the site's sitemap/robots are
  generated, *when* the `/ds` route is considered, *then* it is absent
  from `sitemap.xml` and carries `noindex, nofollow` (and its path is NOT named in
  robots.txt).
- **B5 (AC#5 — sufficient to build against).** *Given* a future page is being
  built, *when* the builder needs the canonical colour/type/spacing/component, *then*
  the reference renders all 10 semantic tokens, the type scale, radius/spacing, and
  the reusable components in one place — enough to build against without reading
  source. (Verified by the section/component tests + a real-browser look.)

## Increments (test-first)

<!-- Ordered, commit-sized steps. Each becomes one meaningful commit. -->

1. **Hidden route skeleton + noindex + exclusion guards (B1, B4).**
   - test (red): `app/ds/page.metadata.test.ts` — imported `metadata`
     has `robots.index === false` / `follow === false`. Fails (no route yet).
   - test (guard): extend `app/sitemap.test.ts` — assert no sitemap entry URL ends
     in `/ds`. `app/robots.test.ts` — assert robots.txt does NOT reference a
     `/ds` Disallow path (no leak). New `app/ds/hidden.test.ts` (source-scan,
     `identity-surfaces` pattern) — `site-nav.tsx`, `command-palette.tsx`,
     `site-footer.tsx` source contains no `/ds`.
   - impl (green): `app/ds/page.tsx` minimal shell + `export const
     metadata = { title: "…", robots: { index:false, follow:false } }` (and
     `dynamic="force-static"` if the export build needs it — match sibling pages).
   - commit: `feat(design-system): hidden /ds route, noindex + unlinked`

2. **Token source list + drift-guard (B3).**
   - test (red): `lib/design-tokens.test.ts` — read `app/theme.css`, extract
     `:root` `--names`, assert `designTokens.map(t => t.name)` equals that set
     exactly (order-independent). Fails (file absent / list wrong).
   - impl (green): `lib/design-tokens.ts` — `designTokens: { name, role }[]` for the
     10 semantic roles (roles from the theme.css header), + `radiusSteps`,
     `typeSamples` as typed data the page maps over.
   - commit: `feat(design-system): token source list mirrored + drift-guarded against theme.css`

3. **Colour section — live-painted swatches + runtime value readout (B2, B3).**
   - test (red): a `TokenSwatch`/colour-section component test (jsdom) — every token
     *name* and *role* renders; each swatch paints via the live var (assert the
     element carries the `bg-<token>` class / `var(--token)`); readout is mount-gated
     (no SSR/text mismatch). jsdom can't compute oklch, so the value *string* is
     verified in a real browser (documented, à la `scroll-into-view-live`).
   - impl (green): colour section + mount-gated `useSyncExternalStore` client leaf
     for the value readout.
   - commit: `feat(design-system): live colour-token section (var-painted + runtime values)`

4. **Type, spacing & radius sections (B2, B5).**
   - test (red): section test — the used type sizes render with their class labels;
     radius steps `rounded-sm…4xl` render; mono/sans/heading samples present.
   - impl (green): the three sections, all painted via live classes/vars.
   - commit: `feat(design-system): type scale, spacing + radius sections`

5. **Component gallery — live real components (B2, B5).**
   - test (red): gallery test — real `Button` variants render (query by role=button,
     per house testing conventions), `Card`, `Kicker`, `StackChips` chips,
     `PulseDot`, `ExternalLink` (role=link, `rel="noopener noreferrer"` on blank),
     `Wordmark` present. Imports the real components (drift-proof).
   - impl (green): the components + patterns sections.
   - commit: `feat(design-system): live component + pattern gallery`

6. **Layout polish + real-browser verification (B5).**
   - Compose the sections into one legible page styled with the real tokens
     (dogfood). Run `npm run dev`, open `/ds`, confirm both themes via the
     toggle, confirm value readouts show real oklch, confirm it's genuinely usable as
     a build reference. Screenshot for the PR.
   - Full gate green: `npm run test`, `npm run typecheck`, `npm run lint`,
     `npm run build` (confirm `/ds` emits to `out/`, carries the noindex
     meta, and is absent from `out/sitemap.xml`).
   - commit: `feat(design-system): compose reference page + verify in browser`

Then `/ship`.

## Out of scope / risks

- **Out:** real access-control/auth (static export has none — ticket defers this);
  automating the *type/spacing* mirror beyond the colour-token name-set (Tailwind
  defaults aren't a repo token set — samples are chosen, not enumerated); a nav/CMD
  entry point (deliberately none); changing any existing token/component/route.
- **Risk — accidental linking later.** Mitigated by the B1 assert-absence guards
  (nav/palette/footer) and the B4 sitemap/robots guards: linking it trips a test.
- **Risk — hydration mismatch** on the theme-dependent value readout. Mitigated by
  the mount-gate (CLAUDE.md hydration rule #2); swatches paint via CSS var so they
  stay render-stable regardless of theme.
- **Risk — export build gotcha** (`dynamic`/static). Mitigated by matching sibling
  page conventions and the `static-export-routes` + `build` check in increment 6.
- **Risk — the value-string readout can't be unit-tested under jsdom** (no layout /
  oklch). Honestly stated: verified in a real browser, like `scroll-into-view-live`;
  the *logic* around it (mount gate, token mapping) is unit-tested.

## Notes

- Design-intent context (not the rendered source): `docs/design-brief.md` +
  `docs/design-artifacts/v1-design-akds-portfolio-2026.zip` (Claude Design v1,
  Jul 2026). Used only to frame the reference's narrative (semantic roles,
  mono-as-accent, restraint); the rendered system comes from live code so it can't
  go stale against v1.
- Route name `/ds` chosen for clarity; open to a less-guessable slug if
  preferred (doesn't change any mechanics).
