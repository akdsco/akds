import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "vitest";

// The site is a static export (next.config.ts: output "export"). Metadata routes
// must declare `dynamic = "force-static"` directly, or the export build aborts.
// This guards that the declaration is not dropped in a later edit.
describe("static-export metadata routes", () => {
  test.each(["robots.ts", "sitemap.ts"])(
    "%s forces static rendering",
    (file) => {
      const src = readFileSync(join(__dirname, file), "utf8");
      expect(src).toContain('export const dynamic = "force-static"');
    },
  );
});
