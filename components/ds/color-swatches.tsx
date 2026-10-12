import { designTokens } from "@/lib/design-tokens";
import { readThemeTokenValues } from "@/lib/theme-css";

// Server component. The swatch paints from the live `var(--<name>)` (so the
// colour shown is the active theme's real colour), and the oklch values are the
// authored ones read from app/theme.css at build time — a true mirror of the
// source for both modes, copy-paste ready for a builder, never a stale literal.

export function ColorSwatches() {
  const values = readThemeTokenValues();

  return (
    <ul role="list" className="grid gap-3 sm:grid-cols-2">
      {designTokens.map((t) => {
        const v = values[t.name];
        return (
          <li
            key={t.name}
            className="border-line bg-panel flex items-center gap-3 rounded-lg border p-3"
          >
            {/* Painted from the live var; the checker backing lets a translucent
                token (line, chip, hi-soft) read against something. */}
            <span
              aria-hidden
              className="border-line size-10 shrink-0 rounded-md border [background-image:linear-gradient(45deg,var(--line)_25%,transparent_25%),linear-gradient(-45deg,var(--line)_25%,transparent_25%)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]"
            >
              <span
                className="block size-full rounded-md"
                style={{ background: `var(--${t.name})` }}
              />
            </span>
            <div className="min-w-0 flex-1">
              <code className="text-ink font-mono text-[12px]">--{t.name}</code>
              <p className="text-dim text-xs">{t.role}</p>
            </div>
            <dl className="text-faint shrink-0 text-right font-mono text-[10px] leading-relaxed">
              <div className="flex justify-end gap-2">
                <dt className="text-faint/70">light</dt>
                <dd className="text-dim">{v?.light}</dd>
              </div>
              <div className="flex justify-end gap-2">
                <dt className="text-faint/70">dark</dt>
                <dd className="text-dim">{v?.dark}</dd>
              </div>
            </dl>
          </li>
        );
      })}
    </ul>
  );
}
