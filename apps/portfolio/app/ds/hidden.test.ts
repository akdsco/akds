import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "vitest";

// TB-192 (AC#1): the /ds reference must be reachable only by typing its direct
// URL — no visible link or entry point. The nav links, command-palette commands
// and footer links are all hand-maintained lists, so the only way /ds leaks in
// is if someone adds it. This source scan (same approach as
// identity-surfaces.test.ts) fails loudly the moment it does.
const read = (rel: string) =>
  readFileSync(join(process.cwd(), rel), { encoding: "utf8" });

// Matches the route used as a link target: a quote/backtick, then `/ds`, then a
// slash or the closing quote — so it catches `"/ds"` and `"/ds/..."` without
// false-matching an unrelated token like `/dstuff`.
const linksToDs = /["'`]\/ds(?:\/|["'`])/;

describe("/ds is unlinked (no visible entry point)", () => {
  test.each([
    "components/site-nav.tsx",
    "components/command-palette.tsx",
    "components/site-footer.tsx",
  ])("%s does not link to /ds", (file) => {
    expect(read(file)).not.toMatch(linksToDs);
  });
});
