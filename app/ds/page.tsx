import type { Metadata } from "next";

import { ColorSwatches } from "@/components/ds/color-swatches";
import { ComponentGallery, Patterns } from "@/components/ds/gallery";
import { RadiusScale, SpacingScale, TypeScale } from "@/components/ds/scales";
import { Kicker } from "@/components/kicker";

// TB-192: the hidden, on-site design-system reference. A build-time tool that
// renders the site's LIVE design system (tokens, type, spacing, components) so
// future pages have a canonical guide to build against and check for drift.
//
// Hidden = unlinked (no nav/palette/footer entry) + excluded from the sitemap +
// noindex. Static export has no auth, so this is the extent of "hidden"; a later
// ticket can add real gating. `robots` here renders
// `<meta name="robots" content="noindex, nofollow">` at build time. No
// page-level openGraph: it inherits the root card, which is irrelevant while the
// page is noindex and unshared.
export const metadata: Metadata = {
  title: "design system",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Design system
        </h1>
        <p className="text-dim mt-2 max-w-prose text-sm">
          The site&rsquo;s live design language, rendered from the real tokens
          and components. Build new pages against this; it mirrors what the site
          uses today. Colours list both modes; toggle the theme (top-right) to
          see the components in each.
        </p>
      </header>

      <section className="mb-14">
        <Kicker label="Colour tokens" />
        <ColorSwatches />
      </section>

      <section className="mb-14">
        <Kicker label="Type scale" />
        <TypeScale />
      </section>

      <section className="mb-14">
        <Kicker label="Radius" />
        <RadiusScale />
      </section>

      <section className="mb-14">
        <Kicker label="Spacing" />
        <SpacingScale />
      </section>

      <section className="mb-14">
        <Kicker label="Components" />
        <ComponentGallery />
      </section>

      <section className="mb-14">
        <Kicker label="Patterns" />
        <Patterns />
      </section>
    </div>
  );
}
