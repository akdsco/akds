import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { RadiusScale, SpacingScale, TypeScale } from "@/components/ds/scales";
import { radiusSteps, spacingSteps, typeSamples } from "@/lib/design-tokens";

// TB-192 (AC#2, AC#5): type scale, spacing and radius are rendered live via the
// real Tailwind utilities. Here the class name IS the unit under test (the
// scale is the documentation), so asserting the exact class label is correct.
describe("scale sections", () => {
  test("TypeScale renders every used size with its class label", () => {
    render(<TypeScale />);
    for (const s of typeSamples) {
      expect(screen.getByText(s.label)).toBeInTheDocument();
    }
  });

  test("TypeScale shows the font families (sans body + mono accent)", () => {
    render(<TypeScale />);
    expect(screen.getByText(/Geist Sans/i)).toBeInTheDocument();
    expect(screen.getByText(/Geist Mono/i)).toBeInTheDocument();
  });

  test("RadiusScale renders every radius step", () => {
    render(<RadiusScale />);
    // Scope to the swatch list: the explanatory note below also mentions some
    // rounded-* class names, so a bare getByText would find two.
    const list = within(screen.getByRole("list"));
    for (const r of radiusSteps) {
      expect(list.getByText(r.className)).toBeInTheDocument();
    }
  });

  test("SpacingScale renders every spacing step", () => {
    render(<SpacingScale />);
    for (const s of spacingSteps) {
      expect(screen.getByText(s.label)).toBeInTheDocument();
    }
  });
});
