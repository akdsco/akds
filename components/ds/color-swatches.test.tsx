import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ColorSwatches } from "@/components/ds/color-swatches";
import { designTokens } from "@/lib/design-tokens";
import { readThemeTokenValues } from "@/lib/theme-css";

// TB-192 (AC#2, AC#3): the colour section renders the real palette — one entry
// per semantic token with its name + role, and BOTH authored values (light +
// dark) read straight from app/theme.css, each painted as its own swatch. A
// true source mirror: swatch and value both come from the parsed oklch, so they
// can't disagree and nothing is hand-copied.
describe("ColorSwatches", () => {
  const values = readThemeTokenValues();

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

  test("paints a light and a dark swatch per token from the authored oklch", () => {
    const { container } = render(<ColorSwatches />);
    for (const t of designTokens) {
      const v = values[t.name];
      // Each value appears at least twice: once as the swatch background,
      // once as the printed oklch readout.
      expect(container.innerHTML).toContain(v?.light ?? "MISSING-LIGHT");
      expect(container.innerHTML).toContain(v?.dark ?? "MISSING-DARK");
    }
  });

  test("labels both modes so each swatch lines up with its value", () => {
    render(<ColorSwatches />);
    // Every token row carries a light + dark label pair.
    expect(screen.getAllByText("light")).toHaveLength(designTokens.length);
    expect(screen.getAllByText("dark")).toHaveLength(designTokens.length);
  });
});
