// Source data for the hidden /ds design-system reference (TB-192).
//
// The semantic colour palette's single source of truth is app/theme.css. This
// file lists the token NAMES + their roles; design-tokens.test.ts guards that
// the name set matches theme.css exactly, so it can't silently drift. The
// reference paints each swatch from the live `var(--<name>)` and reads the oklch
// value at runtime, so the colours/values shown are always the real current ones
// — this list never carries a copied value.

export type DesignToken = {
  /** CSS custom property name without the leading `--` (e.g. "base"). */
  name: string;
  /** What role this colour plays, per the app/theme.css header. */
  role: string;
};

/** The semantic colour palette — mirrors app/theme.css `:root`/`.dark`. */
export const designTokens: DesignToken[] = [
  { name: "base", role: "page background" },
  { name: "panel", role: "cards / surfaces" },
  { name: "ink", role: "primary text" },
  { name: "dim", role: "secondary text" },
  { name: "faint", role: "tertiary / labels" },
  { name: "line", role: "borders / dividers" },
  { name: "chip", role: "chip / tag background" },
  { name: "brand", role: "the cyan $ prompt + accents" },
  { name: "hi", role: "coral highlight — kickers, arrows, pulses, emphasis" },
  { name: "hi-soft", role: "translucent hi — glows / focus rings" },
];

/** The radius scale from globals.css (`--radius-*`, derived from `--radius`).
 * Rendered live via the Tailwind `rounded-*` utilities, so the curve shown is
 * the real one. Full literal class names so Tailwind's scanner keeps them. */
export const radiusSteps = [
  { label: "sm", className: "rounded-sm" },
  { label: "md", className: "rounded-md" },
  { label: "lg", className: "rounded-lg" },
  { label: "xl", className: "rounded-xl" },
  { label: "2xl", className: "rounded-2xl" },
  { label: "3xl", className: "rounded-3xl" },
  { label: "4xl", className: "rounded-4xl" },
] as const;

/** The type sizes the site actually uses, largest first. Rendered in Geist Sans
 * live via the real `text-*` utilities (full literal names for the scanner). */
export const typeSamples = [
  { className: "text-5xl", label: "text-5xl" },
  { className: "text-4xl", label: "text-4xl" },
  { className: "text-2xl", label: "text-2xl" },
  { className: "text-xl", label: "text-xl" },
  { className: "text-lg", label: "text-lg" },
  { className: "text-base", label: "text-base" },
  { className: "text-sm", label: "text-sm" },
  { className: "text-xs", label: "text-xs" },
] as const;
