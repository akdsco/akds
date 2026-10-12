import type { Metadata } from "next";

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
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Design system
      </h1>
    </div>
  );
}
