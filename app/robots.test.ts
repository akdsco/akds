import { describe, expect, test } from "vitest";

import robots from "@/app/robots";
import { SITE_URL } from "@/lib/site";

describe("robots", () => {
  const result = robots();

  test("allows crawling the whole site", () => {
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    expect(rules).toContainEqual(
      expect.objectContaining({ userAgent: "*", allow: "/" }),
    );
  });

  test("points crawlers at the absolute sitemap URL", () => {
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  // TB-192 (AC#4): /ds is hidden, but it must NOT be named in robots.txt. A
  // `Disallow: /ds` line would publish the secret URL in a world-readable file
  // (the classic leak). Hidden is unlinked + unlisted + noindex — never a
  // robots.txt entry. Assert no rule mentions the /ds path.
  test("does not name the hidden /ds path (which would leak it)", () => {
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const paths = rules.flatMap((r) => {
      const allow = r.allow
        ? Array.isArray(r.allow)
          ? r.allow
          : [r.allow]
        : [];
      const disallow = r.disallow
        ? Array.isArray(r.disallow)
          ? r.disallow
          : [r.disallow]
        : [];
      return [...allow, ...disallow];
    });
    expect(paths).not.toContain("/ds");
    expect(paths.some((p) => p.startsWith("/ds"))).toBe(false);
  });
});
