import { ExternalLink } from "@/components/external-link";
import { primaryButton, ghostButton } from "@/lib/button";
import { BOOKING_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

// The one conversion action on the site: book a short call. Points at the
// Cal.com link (BOOKING_URL) so the whole flow stays off this static site.
// `variant` lets the nav use the quieter ghost look and the page bodies the
// solid one, while the destination stays in one place.
export function BookCall({
  variant = "primary",
  label = "Book a free call",
  className,
}: {
  variant?: "primary" | "ghost";
  label?: string;
  className?: string;
}) {
  return (
    <ExternalLink
      href={BOOKING_URL}
      className={cn(
        variant === "primary" ? primaryButton : ghostButton,
        className,
      )}
    >
      {label}
    </ExternalLink>
  );
}
