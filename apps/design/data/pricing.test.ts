import { describe, expect, test } from "vitest";

import {
  addOns,
  buildTiers,
  carePlans,
  guarantees,
  includedInEveryBuild,
} from "@/data/pricing";

describe("pricing data", () => {
  test("three build tiers, three care plans", () => {
    expect(buildTiers).toHaveLength(3);
    expect(carePlans).toHaveLength(3);
  });

  test("every price is a positive integer in GBP", () => {
    for (const t of [...buildTiers, ...carePlans]) {
      expect(Number.isInteger(t.price)).toBe(true);
      expect(t.price).toBeGreaterThan(0);
    }
  });

  test("exactly one tier and one plan are flagged popular", () => {
    expect(buildTiers.filter((t) => t.popular)).toHaveLength(1);
    expect(carePlans.filter((p) => p.popular)).toHaveLength(1);
  });

  test("every tier and plan lists features", () => {
    for (const t of [...buildTiers, ...carePlans]) {
      expect(t.features.length).toBeGreaterThan(0);
    }
  });

  // Each step up inherits the one below by name, so a reorder or rename can't
  // silently leave a tier claiming "Everything in <a tier that moved>".
  test("non-first tiers open with 'Everything in <previous>'", () => {
    for (const list of [buildTiers, carePlans]) {
      for (let i = 1; i < list.length; i++) {
        expect(list[i]?.features[0]).toBe(`Everything in ${list[i - 1]?.name}`);
      }
    }
  });

  test("add-ons price positively, or null for a quoted custom one", () => {
    for (const a of addOns) {
      if (a.price === null) continue;
      expect(a.price).toBeGreaterThan(0);
    }
    expect(addOns.some((a) => a.price === null)).toBe(true);
  });

  test("trust and inclusion lists are non-empty", () => {
    expect(guarantees.length).toBeGreaterThan(0);
    expect(includedInEveryBuild.length).toBeGreaterThan(0);
  });
});
