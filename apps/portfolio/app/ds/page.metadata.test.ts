import { describe, expect, it } from "vitest";

import { metadata } from "./page";

// TB-192 (AC#4): the design-system reference is a hidden build tool, not
// recruiter content. Static export has no auth, so "hidden" is enforced by the
// route's own metadata declaring noindex — which renders
// `<meta name="robots" content="noindex, nofollow">` at build time. If this
// block is ever dropped the page silently becomes indexable, so assert it.
describe("ds (design-system) page metadata", () => {
  it("is noindex, nofollow so it stays off the public/indexed surface", () => {
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });
});
