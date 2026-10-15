// Shared button looks. Primary is the high-contrast neutral (dark in light mode,
// light in dark mode) so it always reads as the main action; coral is kept for
// accents and hover, not a whole filled button, so it stays an accent.
export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-base transition-colors hover:bg-ink/90";

export const ghostButton =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:text-hi";
