import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

// HeroPrompt (inside the gallery) reads the Next app router via PaletteProvider;
// stub it, same as hero.test.tsx.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import { PaletteProvider } from "@/components/command-palette";
import { ComponentGallery } from "@/components/ds/gallery";
import { experience, projects, testimonials } from "@/data/portfolio";

// TB-192 (AC#2, AC#3, AC#5): the gallery renders the REAL components the site
// ships, with REAL data from data/portfolio — not re-implementations or
// placeholder content. Query by role so each is a genuine accessible control.
const cardProject = projects.find((p) => p.caseStudy);
const firstTestimonial = [...testimonials].sort((a, b) => a.order - b.order)[0];
const firstRole = experience[0];

const renderGallery = () =>
  render(
    <PaletteProvider>
      <ComponentGallery />
    </PaletteProvider>,
  );

describe("ComponentGallery", () => {
  test("renders the real ProjectCard with real project data", () => {
    renderGallery();
    expect(cardProject).toBeDefined();
    if (!cardProject) return;
    const link = screen.getByRole("link", {
      name: new RegExp(cardProject.title, "i"),
    });
    expect(link).toHaveAttribute("href", `/projects/${cardProject.slug}`);
  });

  test("renders the real TestimonialCard with a real testimonial", () => {
    renderGallery();
    if (!firstTestimonial) return;
    expect(screen.getByText(firstTestimonial.author)).toBeInTheDocument();
  });

  test("renders the real RoleStack with a role's real lead tech", () => {
    renderGallery();
    if (!firstRole) return;
    for (const item of firstRole.stack.lead) {
      expect(screen.getAllByText(item).length).toBeGreaterThan(0);
    }
  });

  test("renders the real HeroPrompt as a command-palette button", () => {
    renderGallery();
    // The visible command leads the accessible name (WCAG label-in-name).
    const prompt = screen.getByRole("button", {
      name: /cat ~\/about\.md/i,
    });
    expect(prompt).toHaveAttribute("aria-haspopup", "dialog");
  });

  test("renders the action button driving the Collapse (real primitive)", () => {
    renderGallery();
    const toggle = screen.getByRole("button", { name: /show detail/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls");
  });

  test("routes outbound links through ExternalLink (safe rel on target=_blank)", () => {
    renderGallery();
    const link = screen.getAllByRole("link", { name: /a prose link/i })[0];
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("renders an unlinked company as plain text (no anchor)", () => {
    renderGallery();
    expect(
      screen.queryByRole("link", { name: /connect4/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Connect4/)).toBeInTheDocument();
  });
});
