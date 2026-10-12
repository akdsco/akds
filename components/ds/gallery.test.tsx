import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ComponentGallery } from "@/components/ds/gallery";

// TB-192 (AC#2, AC#5): the gallery renders the REAL, imported components live
// (no re-implementation), so it can't drift. Query by role — that also proves
// each is a genuine accessible control (a real <button>/<a>), which a testid
// would let slip.
describe("ComponentGallery", () => {
  test("renders the real Button in each variant (as accessible buttons)", () => {
    render(<ComponentGallery />);
    // The 6 cva variants, rendered with their names as labels.
    for (const name of [
      "default",
      "outline",
      "secondary",
      "ghost",
      "destructive",
      "link",
    ]) {
      expect(
        screen.getByRole("button", { name: new RegExp(`^${name}$`, "i") }),
      ).toBeInTheDocument();
    }
  });

  test("renders a live Card with its title", () => {
    render(<ComponentGallery />);
    expect(screen.getByText("Card title")).toBeInTheDocument();
  });

  test("renders StackChips as a chip row", () => {
    render(<ComponentGallery />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  test("routes outbound links through ExternalLink (safe rel on target=_blank)", () => {
    render(<ComponentGallery />);
    const link = screen.getByRole("link", { name: /growthnation/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("renders an unlinked company as plain text (no anchor)", () => {
    render(<ComponentGallery />);
    // Connect4's site is retired, so CompanyLink must NOT render a link for it.
    expect(
      screen.queryByRole("link", { name: /connect4/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Connect4/)).toBeInTheDocument();
  });
});
