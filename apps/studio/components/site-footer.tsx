import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { ExternalLink, proseLinkClass } from "@/components/external-link";
import { PERSONAL_URL, SITE_TAGLINE } from "@/lib/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-line mt-24 border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-sm space-y-2">
          <BrandLockup className="text-base" />
          <p className="text-dim text-sm">{SITE_TAGLINE}</p>
        </div>

        <div className="text-dim flex flex-col gap-1 text-sm md:items-end">
          <nav className="flex gap-4">
            <Link href="/#work" className="hover:text-hi transition-colors">
              Work
            </Link>
            <Link href="/pricing" className="hover:text-hi transition-colors">
              Pricing
            </Link>
          </nav>
          <p className="text-faint text-xs">
            Built by{" "}
            <ExternalLink href={PERSONAL_URL} className={proseLinkClass}>
              akds
            </ExternalLink>{" "}
            in London. {year}.
          </p>
        </div>
      </div>
    </footer>
  );
}
