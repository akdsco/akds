import {
  ExternalLink,
  GithubIcon,
  iconLinkClass,
  LinkedinIcon,
} from "@akds/ui";
import type { SocialLink } from "@/data/portfolio";

// One owner for a social link rendered as an icon: the ExternalLink + icon-link
// treatment + the right glyph live here, so the nav and the /ds reference (and
// any future caller) all render the identical, hover-able control instead of
// each re-wrapping the glyph. The glyph lights to the accent on hover via
// iconLinkClass.
const ICONS: Record<string, typeof GithubIcon> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
};

export function SocialIconLink({ social }: { social: SocialLink }) {
  const Icon = ICONS[social.label];
  return (
    <ExternalLink
      href={social.url}
      aria-label={social.label}
      className={iconLinkClass}
    >
      {/* A label with no mapped glyph still renders (as text), so a new public
          social can never silently vanish from the nav — it shows up asking for
          an icon. */}
      {Icon ? (
        <Icon className="size-4" />
      ) : (
        <span className="text-[10px]">{social.label}</span>
      )}
    </ExternalLink>
  );
}
