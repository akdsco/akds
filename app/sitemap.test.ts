import { describe, expect, test } from "vitest";

import sitemap from "@/app/sitemap";
import { projects } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";

// The sitemap is generated from the data layer, so a new case study should show
// up automatically. Assert the coverage + that every URL is absolute (crawlers
// reject relative sitemap entries).
describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  test("includes the static routes", () => {
    expect(urls).toContain(`${SITE_URL}/about`);
    expect(urls).toContain(`${SITE_URL}/projects`);
  });

  test("includes one entry per case-study slug", () => {
    const caseStudySlugs = projects
      .filter((p) => p.caseStudy)
      .map((p) => p.slug);
    expect(caseStudySlugs.length).toBeGreaterThan(0);
    for (const slug of caseStudySlugs) {
      expect(urls).toContain(`${SITE_URL}/projects/${slug}`);
    }
  });

  test("lists no non-case-study project as a detail page", () => {
    const nonCaseStudySlugs = projects
      .filter((p) => !p.caseStudy)
      .map((p) => p.slug);
    for (const slug of nonCaseStudySlugs) {
      expect(urls).not.toContain(`${SITE_URL}/projects/${slug}`);
    }
  });

  test("every url is absolute under the site origin", () => {
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url.startsWith(`${SITE_URL}/`)).toBe(true);
    }
  });

  // TB-192 (AC#4): /ds is the hidden design-system reference. The sitemap is a
  // manual allowlist, so it is excluded by default — this asserts it stays out
  // if the allowlist ever grows.
  test("omits the hidden /ds design-system reference", () => {
    expect(urls).not.toContain(`${SITE_URL}/ds`);
  });
});
