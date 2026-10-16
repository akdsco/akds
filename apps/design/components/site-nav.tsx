import Link from "next/link";

import { BookCall } from "@/components/book-call";
import { BrandLockup } from "@/components/brand-lockup";
import { ModeToggle } from "@/components/mode-toggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#what", label: "What we do" },
  { href: "/pricing", label: "Pricing" },
] as const;

export function SiteNav() {
  return (
    <header className="border-line bg-base/80 sticky top-0 z-40 border-b backdrop-blur">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center gap-4 px-5 md:px-8">
        <Link href="/" aria-label="akdsdesign home" className="mr-auto">
          <BrandLockup />
        </Link>

        <ul className="hidden items-center gap-1 text-[13.5px] sm:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-dim hover:text-hi rounded-md px-2.5 py-1.5 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <BookCall
            variant="ghost"
            label="Book a call"
            className="hidden px-3.5 py-2 sm:inline-flex"
          />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
