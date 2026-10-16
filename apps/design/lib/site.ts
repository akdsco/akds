// Single source of truth for the production origin and the brand strings. A
// domain move is a one-line edit here; metadataBase, canonical URLs and the
// sitemap all derive from it. No trailing slash, callers append their own paths.
export const SITE_URL = "https://akdsdesign.uk";

// The brand. "akds" is the engineer behind it (akds.dev); "design" names the
// studio arm. Kept as two parts so the wordmark can weight them differently.
export const SITE_BRAND = "akdsdesign";
export const BRAND_PRIMARY = "akds";
export const BRAND_SUFFIX = "design";

// One-line pitch, reused in metadata and the hero.
export const SITE_TAGLINE =
  "Websites and automations for independent London shops and studios.";

// Where "Book a call" points. A Cal.com scheduling link keeps the booking flow
// off this static site (no backend) while still being a real, low-friction CTA.
// TODO(akds): swap for the real Cal.com handle once the account exists.
export const BOOKING_URL = "https://cal.com/akds/intro";

// The one personal link back to the engineer behind the studio.
export const PERSONAL_URL = "https://akds.dev";
