import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { SocialIconLink } from "@/components/social-icon-link";

describe("SocialIconLink", () => {
  test("renders a mapped social as a safe external icon link", () => {
    render(
      <SocialIconLink
        social={{ label: "GitHub", url: "https://github.com/akdsco" }}
      />,
    );
    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toHaveAttribute("href", "https://github.com/akdsco");
    // ExternalLink guarantees the safe target/rel pair.
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("falls back to visible label text when no glyph is mapped (never silently drops)", () => {
    render(
      <SocialIconLink
        social={{ label: "Mastodon", url: "https://example.com" }}
      />,
    );
    const link = screen.getByRole("link", { name: /mastodon/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Mastodon");
  });
});
