import { describe, expect, test } from "vitest";

import { BOOKING_URL, PERSONAL_URL, SITE_URL } from "@/lib/site";

describe("site config", () => {
  test("SITE_URL is https with no trailing slash", () => {
    expect(SITE_URL.startsWith("https://")).toBe(true);
    expect(SITE_URL.endsWith("/")).toBe(false);
  });

  test("outbound links are https", () => {
    for (const u of [BOOKING_URL, PERSONAL_URL]) {
      expect(u.startsWith("https://")).toBe(true);
    }
  });
});
