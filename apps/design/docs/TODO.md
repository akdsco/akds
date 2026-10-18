# TODO — akdsdesign

Pending ideas and work, kept out of CLAUDE.md so that file stays rules, not state.

## Branding / motion

- [ ] **Port the akds "pop-up" wordmark animation to this site.** Reuse the
      cropped `akds` wordmark + per-letter coral flare from akds.dev, but spin it
      for **"akdsDESIGN"**: a unique-but-related animation, same family, its own
      character (the `DESIGN` half wants its own beat, not just four more letters
      of the same wave). Do the **footer sign-off** variant too (the slower,
      glow-swell version), adapted the same way.
      Source to port from: `components/wordmark.tsx` + the `wordmark-flare` /
      `wordmark-signoff` keyframes in `app/globals.css` on akds.dev
      (= `apps/portfolio`).

      **Architecture decision (own ticket):** make this a **shared motion engine**
      in `@akds/ui` (the clip/crop mechanism, geometry, and the keyframes — already
      CSS-variable driven) that BOTH apps consume, with each app supplying its own
      identity (the word, colours, timing; the `DESIGN` half's beat). Hard
      constraint: akds.dev's current wordmark must render **byte-identical** after
      the extraction (lock it with a characterization test first). This studio app
      still carries the now-orphaned `.wordmark-*` keyframes in `app/globals.css`
      (left from the scaffold; the `Wordmark`/geometry TS was removed in the
      monorepo migration) — that cleanup rides with this ticket, not before it.

## Booking

- [ ] **Explore a booking tool (working name "Neato") for booking my time up.**
      Instead of leaning on Cal.com long-term, explore building / branding our own
      way to let clients book discovery calls. Possible side-bet / product in its
      own right. Cal.com stays the placeholder (`BOOKING_URL` in `lib/site.ts`)
      until this is decided.

## Deploy (do last)

- [ ] Register **akdsdesign.uk** and wire the custom domain. Last step, not now.
- [x] **Near-term:** deploy to Cloudflare Pages on the generic `*.pages.dev`
      domain so there is a live preview, before the real domain is bought.
      Done: project `akds-design` builds from `main` (`akds-design.pages.dev`).
      Run locally (`npm run dev`) until then.

## Content to chisel (owner-supplied)

- [ ] Swap the placeholder **Cal.com** link for the real handle once it exists.
- [ ] Review the **pricing numbers** in `data/pricing.ts` together (drafts).
- [ ] Chisel the **work blurbs** in `data/work.ts` (kept neutral, no invented
      claims, until the owner writes them).
