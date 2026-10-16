import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "vitest";

import { designTokens } from "./design-tokens";

// TB-192 (AC#3): the /ds reference must be a TRUE MIRROR of the site's tokens,
// never a hand-copied snapshot that can silently diverge. The semantic colour
// palette's single source of truth is the shared packages/ui/src/theme.css (two
// levels up from this app). The reference renders from `designTokens`, and
// swatches/values read the live CSS var — but the *set* of token names is the
// one thing that could drift, so this guards it: extract the `--names` from
// theme.css's `:root` block and assert `designTokens` lists exactly those.
// Add/remove/rename a token in theme.css → this goes red until the reference is
// updated.
describe("design-tokens mirror theme.css", () => {
  const css = readFileSync(
    join(process.cwd(), "..", "..", "packages", "ui", "src", "theme.css"),
    { encoding: "utf8" },
  );

  // The first `:root { ... }` block is the light palette (the canonical name set;
  // `.dark` restates the same names).
  const rootBlock = /:root\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";
  const cssTokenNames = [...rootBlock.matchAll(/--([a-z-]+)\s*:/g)].map(
    (m) => m[1],
  );

  test("theme.css actually declares tokens (parse sanity)", () => {
    expect(cssTokenNames.length).toBeGreaterThan(0);
  });

  test("designTokens lists exactly the theme.css :root tokens", () => {
    expect([...designTokens.map((t) => t.name)].sort()).toEqual(
      [...cssTokenNames].sort(),
    );
  });

  test("every token carries a non-empty role description", () => {
    for (const t of designTokens) {
      expect(t.role.trim().length).toBeGreaterThan(0);
    }
  });
});
