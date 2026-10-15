import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

// `.claude/notion.json` opts this repo into the shared Notion Tech Board and
// names its project, so the ticket resolvers (notion-mcp.sh / notion-board.sh in
// automation-scripts) stop exiting 3 and hand-resolving. The `project` string
// MUST match the Tech Board select option exactly — a typo silently mis-resolves
// to "no board", which is the failure this guards. Server + board id are left
// unset on purpose: both default correctly, so there is no value here to drift.
describe(".claude/notion.json", () => {
  // `.claude/` stays at the monorepo root (shared config), two levels up from
  // this app (apps/portfolio/). Reach it explicitly rather than cwd-relative so
  // the test passes whether run from the app or the repo root.
  const raw = readFileSync(
    join(__dirname, "..", "..", ".claude", "notion.json"),
    "utf8",
  );

  it("is valid JSON naming the Portfolio 2026 project", () => {
    const config: unknown = JSON.parse(raw);
    expect(config).toMatchObject({ project: "Portfolio 2026" });
  });
});
