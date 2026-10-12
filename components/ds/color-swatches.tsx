"use client";

import { useSyncExternalStore } from "react";

import { designTokens } from "@/lib/design-tokens";

// The oklch value readout depends on which theme is active (light vs dark give
// different values), and the live value lives only in the browser's computed
// style. Rendering it must therefore be gated to the client and must re-read
// when the theme flips. We subscribe to the <html> class attribute (next-themes
// toggles `.dark` there): the snapshot is "" on the server, the real class on
// the client, and it changes on every theme toggle — so this both gates the
// readout (no SSR/hydration mismatch) and re-triggers the read. The swatches
// themselves paint from `var(--…)` inline and are render-stable, so they never
// depend on this.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => {
    observer.disconnect();
  };
};
const getSnapshot = () => document.documentElement.className;
const getServerSnapshot = () => "";

function readVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
}

export function ColorSwatches() {
  // Non-empty only on the client; also updates whenever the theme toggles.
  const htmlClass = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const onClient = htmlClass !== "";

  return (
    <ul role="list" className="grid gap-3 sm:grid-cols-2">
      {designTokens.map((t) => {
        const value = onClient ? readVar(t.name) : "";
        return (
          <li
            key={t.name}
            className="border-line bg-panel flex items-center gap-3 rounded-lg border p-3"
          >
            {/* Painted from the live var, so it shows the real current colour.
                The checker backing lets a translucent token (line, chip,
                hi-soft) read against something. */}
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
            <code className="text-faint shrink-0 font-mono text-[11px] tabular-nums">
              {value || " "}
            </code>
          </li>
        );
      })}
    </ul>
  );
}
