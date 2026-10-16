import { designTokens } from "@/lib/design-tokens";
import { readThemeTokenValues } from "@/lib/theme-css";

// Server component. Each token shows BOTH of its authored values at once — a
// light swatch and a dark swatch, each painted with the exact oklch read from
// packages/ui/src/theme.css at build time and paired with that value. Showing both modes
// side by side (rather than one live-painted swatch keyed to the active theme,
// which read as a mismatch against the two values listed beside it) is what
// makes the swatch unambiguously line up with its number. It's a true mirror of
// the source: a rebuild tracks theme.css, nothing is hand-copied.

// A single swatch: the colour over a checker backing so a translucent token
// (line, chip, hi-soft) reads against something.
function Swatch({ value }: { value: string }) {
  return (
    <span
      aria-hidden
      className="border-line size-9 shrink-0 rounded-md border [background-image:linear-gradient(45deg,var(--line)_25%,transparent_25%),linear-gradient(-45deg,var(--line)_25%,transparent_25%)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]"
    >
      <span
        className="block size-full rounded-md"
        style={{ background: value }}
      />
    </span>
  );
}

function Mode({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Swatch value={value} />
      <div className="min-w-0">
        <div className="text-faint/70 font-mono text-[10px] uppercase">
          {label}
        </div>
        <code className="text-dim font-mono text-[11px]">{value}</code>
      </div>
    </div>
  );
}

export function ColorSwatches() {
  const values = readThemeTokenValues();

  return (
    <ul role="list" className="grid gap-3 lg:grid-cols-2">
      {designTokens.map((t) => {
        const v = values[t.name];
        return (
          <li
            key={t.name}
            className="border-line bg-panel rounded-lg border p-3"
          >
            <div className="mb-3">
              <code className="text-ink font-mono text-[12px]">--{t.name}</code>
              <p className="text-dim text-xs">{t.role}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Mode label="light" value={v?.light ?? ""} />
              <Mode label="dark" value={v?.dark ?? ""} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
