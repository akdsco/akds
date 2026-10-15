import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

// Tailwind v4 auto-scans this app's own tree but NOT node_modules, and the
// shared @akds/ui primitives (ExternalLink's proseLinkClass / iconLinkClass,
// future shared components) live in packages/ui. Without an `@source` directive
// pointing there, any utility used ONLY in the shared package
// (decoration-line, decoration-dotted, underline-offset-[3px], ...) is never
// generated and those links render unstyled — a regression the build does not
// fail on, so nothing else catches it. This guards the directive's presence.
describe("globals.css scans the shared @akds/ui package", () => {
  const css = readFileSync(join(__dirname, "globals.css"), "utf8");

  it("has an @source directive covering packages/ui", () => {
    expect(css).toMatch(/@source\s+["'][^"']*packages\/ui[^"']*["']/);
  });
});
