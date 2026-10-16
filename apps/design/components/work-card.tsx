import { ExternalLink } from "@akds/ui";
import type { WorkItem } from "@/data/work";

// A single piece of work. The whole card is the link to the live site, so the
// proof is one click away. Status reads "live" or "in progress" honestly.
export function WorkCard({ item }: { item: WorkItem }) {
  const host = item.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <ExternalLink
      href={item.url}
      aria-label={`${item.name}, ${item.kind} in ${item.location}`}
      className="group border-line bg-panel hover:border-ink/20 flex flex-col gap-3 rounded-xl border p-5 transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-ink font-medium">{item.name}</span>
        <span className="text-faint flex items-center gap-1.5 font-mono text-[11px]">
          <span
            className={
              item.status === "live"
                ? "size-1.5 rounded-full bg-[var(--brand)]"
                : "size-1.5 rounded-full bg-[var(--hi)]"
            }
          />
          {item.status}
        </span>
      </div>

      <p className="text-faint font-mono text-xs">
        {item.kind} · {item.location}
      </p>

      <p className="text-dim text-sm">{item.blurb}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {item.built.map((b) => (
          <span
            key={b}
            className="bg-chip text-dim rounded-md px-2 py-0.5 text-[11px]"
          >
            {b}
          </span>
        ))}
      </div>

      <span className="text-dim group-hover:text-hi font-mono text-xs transition-colors">
        {host} →
      </span>
    </ExternalLink>
  );
}
