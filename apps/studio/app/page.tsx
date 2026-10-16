import type { Metadata } from "next";

import { BookCall } from "@/components/book-call";
import { Kicker } from "@/components/kicker";
import { WorkCard } from "@/components/work-card";
import { ghostButton } from "@/lib/button";
import Link from "next/link";
import { work } from "@/data/work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const whatWeDo = [
  {
    title: "Websites that convert",
    body: "Fast, custom and built for one job: turning a local search into an enquiry or a booking. No bloated templates.",
  },
  {
    title: "Automations",
    body: "The part a template shop cannot do. Online booking, automatic review requests, reminders and lead routing, wired to run on their own.",
  },
  {
    title: "Found locally",
    body: "Local SEO and a tidy Google Business profile, so you show up when someone nearby is searching for exactly what you do.",
  },
  {
    title: "Owned by you",
    body: "Your site, your code, your domain. A fixed price agreed up front, and no lock-in on the care plan.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Kicker>London web studio</Kicker>
        <h1 className="text-ink max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          Websites and automations for independent London shops and studios.
        </h1>
        <p className="text-dim mt-5 max-w-2xl text-lg">
          An engineer, not a template shop. I build fast local sites that bring
          customers in, then automate the booking and follow-up so the shop runs
          lighter.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <BookCall label="Book a free call" />
          <Link href="/pricing" className={ghostButton}>
            See pricing
          </Link>
        </div>
      </section>

      {/* What we do */}
      <section id="what" className="scroll-mt-20 py-12">
        <Kicker>What we do</Kicker>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {whatWeDo.map((w) => (
            <div
              key={w.title}
              className="border-line bg-panel rounded-xl border p-5"
            >
              <h3 className="text-ink font-medium">{w.title}</h3>
              <p className="text-dim mt-2 text-sm">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-20 py-12">
        <Kicker>Recent work</Kicker>
        <h2 className="text-ink text-2xl font-semibold tracking-tight">
          Real shops, live sites.
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((item) => (
            <WorkCard key={item.url} item={item} />
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16">
        <div className="border-line bg-panel flex flex-col items-start gap-5 rounded-2xl border p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-ink text-2xl font-semibold tracking-tight">
              Want one for your shop?
            </h2>
            <p className="text-dim mt-2 max-w-md text-sm">
              Book a short call. You get a free homepage preview before you pay
              a thing.
            </p>
          </div>
          <BookCall label="Book a free call" />
        </div>
      </section>
    </div>
  );
}
