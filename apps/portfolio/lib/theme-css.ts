import { readFileSync } from "node:fs";
import { join } from "node:path";

// Server-only: reads the AUTHORED token values straight out of the shared
// design-system theme.css at build time, so the /ds reference shows the real
// oklch values a builder would paste back into it — for both light (:root) and
// dark (.dark). This is a true mirror (a rebuild reflects the current file), not
// a hand-copied snapshot. It reads the source rather than getComputedStyle
// because the shipped CSS has Lightning-CSS-transpiled the oklch into a lab()
// fallback, which is the real computed value but not the notation the source
// (or a builder) uses.
//
// The tokens now live in packages/ui (the single source both apps share), two
// levels up from this app's cwd (apps/portfolio) at build and test time.
//
// Must not be imported by a client component (it uses node:fs).

export type TokenValues = { light: string; dark: string };

function parseBlock(css: string, selectorRe: string): Record<string, string> {
  const body =
    new RegExp(`${selectorRe}\\s*\\{([^}]*)\\}`).exec(css)?.[1] ?? "";
  const out: Record<string, string> = {};
  for (const [, name, value] of body.matchAll(/--([a-z-]+)\s*:\s*([^;]+);/g)) {
    if (name && value) out[name] = value.trim();
  }
  return out;
}

/** The authored light + dark value for every token declared in packages/ui/src/theme.css. */
export function readThemeTokenValues(): Record<string, TokenValues> {
  const css = readFileSync(
    join(process.cwd(), "..", "..", "packages", "ui", "src", "theme.css"),
    { encoding: "utf8" },
  );
  const light = parseBlock(css, ":root");
  const dark = parseBlock(css, "\\.dark");
  const names = new Set([...Object.keys(light), ...Object.keys(dark)]);
  const out: Record<string, TokenValues> = {};
  for (const name of names) {
    out[name] = { light: light[name] ?? "", dark: dark[name] ?? "" };
  }
  return out;
}
