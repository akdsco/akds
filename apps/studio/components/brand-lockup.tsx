import { BRAND_PRIMARY, BRAND_SUFFIX } from "@/lib/site";
import { cn } from "@/lib/utils";

// The wordmark: "akds" in ink, "design" dimmed, set in mono so it reads
// dev-coded, tying this studio to akds.dev without repeating its cropped mark.
export function BrandLockup({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[15px] font-semibold tracking-tight lowercase",
        className,
      )}
    >
      <span className="text-ink">{BRAND_PRIMARY}</span>
      <span className="text-dim">{BRAND_SUFFIX}</span>
    </span>
  );
}
