import { describe, expect, test } from "vitest";

import { designTokens } from "./design-tokens";
import { readThemeTokenValues } from "./theme-css";

// TB-192 (AC#3): the authored oklch values parsed from app/theme.css must cover
// every semantic token, in both modes — so the /ds reference shows real source
// values, not copied literals, and a theme.css edit flows straight through.
describe("readThemeTokenValues", () => {
  const values = readThemeTokenValues();

  test("provides a light + dark value for every semantic token", () => {
    for (const t of designTokens) {
      expect(values[t.name]?.light, `${t.name} light`).toMatch(/oklch\(/);
      expect(values[t.name]?.dark, `${t.name} dark`).toMatch(/oklch\(/);
    }
  });

  test("reads the real authored values (light differs from dark)", () => {
    // base is near-white in light, near-black in dark — a sanity check that we
    // parsed two distinct blocks, not the same one twice.
    expect(values.base?.light).not.toBe(values.base?.dark);
  });
});
