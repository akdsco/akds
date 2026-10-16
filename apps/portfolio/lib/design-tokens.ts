// Source data for the hidden /ds design-system reference (TB-192).
//
// The semantic colour palette's single source of truth is packages/ui/src/theme.css. This
// file lists the token NAMES + their roles; design-tokens.test.ts guards that
// the name set matches theme.css exactly, so it can't silently drift. The
// reference paints each swatch from the live `var(--<name>)` and reads the oklch
// value at runtime, so the colours/values shown are always the real current ones
// — this list never carries a copied value.

export type DesignToken = {
  /** CSS custom property name without the leading `--` (e.g. "base"). */
  name: string;
  /** What role this colour plays, per the packages/ui/src/theme.css header. */
  role: string;
};

/** The semantic colour palette — mirrors packages/ui/src/theme.css `:root`/`.dark`. */
export const designTokens: DesignToken[] = [
  { name: "base", role: "page background" },
  { name: "panel", role: "cards / surfaces" },
  { name: "ink", role: "primary text" },
  { name: "dim", role: "secondary text" },
  { name: "faint", role: "tertiary / labels" },
  { name: "line", role: "borders / dividers" },
  { name: "chip", role: "chip / tag background" },
  { name: "brand", role: "the cyan $ prompt + accents" },
  { name: "hi", role: "coral highlight (kickers, arrows, pulses, emphasis)" },
  { name: "hi-soft", role: "translucent hi (glows / focus rings)" },
];

/** The radius-scale steps the site actually uses (`--radius-*` from globals.css).
 * Rendered live via the Tailwind `rounded-*` utilities, so the curve shown is
 * the real one. Full literal class names so Tailwind's scanner keeps them.
 * `rounded-2xl`/`3xl`/`4xl` are defined in the scale but unused on the site, so
 * they're omitted — see the note on the Radius section about bespoke pixel
 * radii, which is what the site mostly reaches for. */
export const radiusSteps = [
  { label: "sm", className: "rounded-sm" },
  { label: "md", className: "rounded-md" },
  { label: "lg", className: "rounded-lg" },
  { label: "xl", className: "rounded-xl" },
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

/** The Tailwind spacing steps the site actually uses for gaps/paddings (verified
 * against real usage — `16` is unused and omitted). Rendered live as bars via
 * literal `w-*` utilities. These are the default Tailwind scale, not a bespoke
 * token set. */
export const spacingSteps = [
  { label: "1", className: "w-1" },
  { label: "2", className: "w-2" },
  { label: "3", className: "w-3" },
  { label: "4", className: "w-4" },
  { label: "6", className: "w-6" },
  { label: "8", className: "w-8" },
  { label: "12", className: "w-12" },
] as const;
