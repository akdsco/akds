import { describe, expect, test } from "vitest";

import { work } from "@/data/work";

describe("work data", () => {
  test("every item is fully filled in", () => {
    for (const item of work) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.kind.length).toBeGreaterThan(0);
      expect(item.location.length).toBeGreaterThan(0);
      expect(item.blurb.length).toBeGreaterThan(0);
      expect(item.built.length).toBeGreaterThan(0);
    }
  });

  test("urls are unique and https", () => {
    const urls = work.map((w) => w.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const u of urls) expect(u.startsWith("https://")).toBe(true);
  });

  test("status is a known value", () => {
    for (const item of work) {
      expect(["live", "in progress"]).toContain(item.status);
    }
  });
});
