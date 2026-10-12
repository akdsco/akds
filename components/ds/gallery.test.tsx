import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ComponentGallery } from "@/components/ds/gallery";
import { projects } from "@/data/portfolio";

// TB-192 (AC#2, AC#3, AC#5): the gallery renders the REAL components the site
// ships, with REAL data from data/portfolio — not re-implementations or
// placeholder content. Query by role so each is a genuine accessible control.
const cardProject = projects.find((p) => p.caseStudy);

describe("ComponentGallery", () => {
  test("renders the real ProjectCard with real project data", () => {
    render(<ComponentGallery />);
    expect(cardProject).toBeDefined();
    if (!cardProject) return;
    // The card the site actually renders — its title, and it links to the
    // case study exactly as on /projects (a case-study card is a link).
    const link = screen.getByRole("link", {
      name: new RegExp(cardProject.title, "i"),
    });
    expect(link).toHaveAttribute("href", `/projects/${cardProject.slug}`);
  });

  test("shows the card's real stack via StackChips", () => {
    render(<ComponentGallery />);
    if (!cardProject) return;
    for (const item of cardProject.stack) {
      expect(screen.getAllByText(item).length).toBeGreaterThan(0);
    }
  });

  test("routes outbound links through ExternalLink (safe rel on target=_blank)", () => {
    render(<ComponentGallery />);
    const link = screen.getAllByRole("link", { name: /a prose link/i })[0];
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
