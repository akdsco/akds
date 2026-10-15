// The site's action / toggle button style — the "Show earlier work" button and
// the about-page reveal toggle. A shared class string, matching how `chipClass`
// (stack-chips) and `proseLinkClass` (external-link) are shared, so the two call
// sites and the /ds reference can't drift from one another. There is no shadcn
// Button here (it went unused and was removed); this mono-chip button is the
// real one the site uses.
export const actionButtonClass =
  "border-line bg-chip text-dim hover:text-ink hover:border-hi cursor-pointer rounded-[7px] border px-3.5 py-1.5 font-mono text-xs transition-colors";
