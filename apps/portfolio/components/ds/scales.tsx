import { radiusSteps, spacingSteps, typeSamples } from "@/lib/design-tokens";

// Server components — the scale is rendered live via the real Tailwind
// utilities, so what's shown is the actual curve/size, not a description.

const sampleText = "The quick brown fox";

export function TypeScale() {
  return (
    <div className="space-y-6">
      <ul role="list" className="space-y-3">
        {typeSamples.map((s) => (
          <li key={s.className} className="flex items-baseline gap-4">
            <code className="text-faint w-20 shrink-0 font-mono text-[11px]">
              {s.label}
            </code>
            <span className={`${s.className} text-ink truncate`}>
              {sampleText}
            </span>
          </li>
        ))}
      </ul>
      <dl className="border-line grid gap-3 border-t pt-6 sm:grid-cols-2">
        <div>
          <dt className="text-ink font-sans text-base">Geist Sans</dt>
          <dd className="text-dim font-mono text-[11px]">
            font-sans · body + headings (default; headings add font-semibold)
          </dd>
        </div>
        <div>
          <dt className="text-ink font-mono text-base">Geist Mono</dt>
          <dd className="text-dim font-mono text-[11px]">
            font-mono · labels, chips, metadata
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function RadiusScale() {
  return (
    <div className="space-y-4">
      <ul role="list" className="flex flex-wrap items-end gap-6">
        {radiusSteps.map((r) => (
          <li key={r.className} className="flex flex-col items-center gap-2">
            <span
              aria-hidden
              className={`border-line bg-chip size-14 border ${r.className}`}
            />
            <code className="text-faint font-mono text-[11px]">
              {r.className}
            </code>
          </li>
        ))}
      </ul>
      <p className="text-faint text-xs">
        Only the scale steps the site uses are shown. In practice most surfaces
        reach for a specific pixel radius instead: chips{" "}
        <code className="font-mono">rounded-[5px]</code>, cards{" "}
        <code className="font-mono">rounded-[11px]</code>, buttons{" "}
        <code className="font-mono">rounded-lg</code>.
      </p>
    </div>
  );
}

export function SpacingScale() {
  return (
    <ul role="list" className="space-y-2">
      {spacingSteps.map((s) => (
        <li key={s.label} className="flex items-center gap-4">
          <code className="text-faint w-8 shrink-0 text-right font-mono text-[11px]">
            {s.label}
          </code>
          <span aria-hidden className={`bg-brand h-3 ${s.className}`} />
        </li>
      ))}
    </ul>
  );
}
