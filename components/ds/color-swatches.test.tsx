import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ColorSwatches } from "@/components/ds/color-swatches";
import { designTokens } from "@/lib/design-tokens";
import { readThemeTokenValues } from "@/lib/theme-css";

// TB-192 (AC#2, AC#3): the colour section renders the real palette live — one
// entry per semantic token, each swatch painted from the live `var(--<name>)`
// (not a copied literal) with its name + role, and the authored oklch value for
// both light and dark read straight from app/theme.css (a true source mirror).
describe("ColorSwatches", () => {
  test("renders one entry per semantic token", () => {
    render(<ColorSwatches />);
    expect(screen.getAllByRole("listitem")).toHaveLength(designTokens.length);
  });

  test("shows each token's name and role", () => {
    render(<ColorSwatches />);
    for (const t of designTokens) {
      expect(screen.getByText(`--${t.name}`)).toBeInTheDocument();
      expect(screen.getByText(t.role)).toBeInTheDocument();
    }
  });

  test("paints each swatch from the live CSS var (true mirror, not a copy)", () => {
    const { container } = render(<ColorSwatches />);
    for (const t of designTokens) {
      expect(container.innerHTML).toContain(`var(--${t.name})`);
    }
  });

  test("shows the authored light + dark oklch values from theme.css", () => {
    const { container } = render(<ColorSwatches />);
    const values = readThemeTokenValues();
    // Spot-check a representative token both ways.
    expect(container.innerHTML).toContain(values.base?.light ?? "MISSING");
    expect(container.innerHTML).toContain(values.hi?.dark ?? "MISSING");
  });
});
