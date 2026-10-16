import type { Metadata } from "next";
import { Check } from "lucide-react";

import { BookCall } from "@/components/book-call";
import { Kicker } from "@/components/kicker";
import {
  addOns,
  buildTiers,
  carePlans,
  guarantees,
  includedInEveryBuild,
  type CarePlan,
  type Tier,
} from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Fixed, transparent pricing for websites and automations. A free homepage preview first, and you pay nothing until you approve it.",
  alternates: { canonical: "/pricing" },
};

const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

function PopularBadge() {
  return (
    <span className="bg-hi-soft text-hi rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wide uppercase">
      Most popular
    </span>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((f) => (
        <li key={f} className="text-dim flex gap-2.5 text-sm">
          <Check className="text-hi mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 ${
        tier.popular ? "border-hi/40 bg-panel" : "border-line bg-panel"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-ink text-lg font-semibold">{tier.name}</h3>
        {tier.popular ? <PopularBadge /> : null}
      </div>
      <p className="mt-3">
        <span className="text-ink text-3xl font-semibold tracking-tight">
          {gbp(tier.price)}
        </span>
        <span className="text-faint ml-1.5 text-sm">one-off</span>
      </p>
      <p className="text-dim mt-2 text-sm">{tier.best}</p>
      <FeatureList items={tier.features} />
      <BookCall label="Get a free preview" className="mt-6 w-full" />
    </div>
  );
}

function CarePlanCard({ plan }: { plan: CarePlan }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 ${
        plan.popular ? "border-hi/40 bg-panel" : "border-line bg-panel"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-ink text-lg font-semibold">{plan.name}</h3>
        {plan.popular ? <PopularBadge /> : null}
      </div>
      <p className="mt-3">
        <span className="text-ink text-3xl font-semibold tracking-tight">
          {gbp(plan.price)}
        </span>
        <span className="text-faint ml-1.5 text-sm">/ month</span>
      </p>
      <p className="text-dim mt-2 text-sm">{plan.blurb}</p>
      <FeatureList items={plan.features} />
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
      {/* Header */}
      <section className="py-16 md:py-20">
        <Kicker>Pricing</Kicker>
        <h1 className="text-ink max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Simple, fixed pricing.
        </h1>
        <p className="text-dim mt-5 max-w-2xl text-lg">
          A free homepage preview comes first. You pay nothing until you approve
          it, the price is agreed in writing, and you own everything at the end.
        </p>
      </section>

      {/* Build tiers */}
      <section className="pb-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {buildTiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>
        <p className="text-faint mt-4 text-center text-xs">
          Build split 50% on approval, 50% on launch. Every build runs on a care
          plan once it is live.
        </p>
      </section>

      {/* Included in every build */}
      <section className="py-12">
        <div className="border-line rounded-2xl border p-6">
          <h2 className="text-ink font-semibold">In every build</h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {includedInEveryBuild.map((f) => (
              <li key={f} className="text-dim flex gap-2.5 text-sm">
                <Check className="text-hi mt-0.5 size-4 shrink-0" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Care plans */}
      <section className="py-12">
        <Kicker>Care plans</Kicker>
        <h2 className="text-ink text-2xl font-semibold tracking-tight">
          Keep it live, keep it working.
        </h2>
        <p className="text-dim mt-3 max-w-2xl text-sm">
          Hosting, backups and security, plus the time to keep the site fresh
          and the automations running. No contract, cancel any time.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {carePlans.map((plan) => (
            <CarePlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-12">
        <Kicker>Add-ons</Kicker>
        <div className="border-line mt-4 divide-y divide-[var(--line)] rounded-2xl border">
          {addOns.map((a) => (
            <div
              key={a.name}
              className="flex items-center justify-between gap-4 px-5 py-3.5"
            >
              <span className="text-dim text-sm">{a.name}</span>
              <span className="text-ink font-mono text-sm">
                {a.price === null ? "quoted" : gbp(a.price)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-12">
        <Kicker>No-risk promise</Kicker>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {guarantees.map((g) => (
            <li
              key={g}
              className="border-line text-dim flex gap-2.5 rounded-xl border p-4 text-sm"
            >
              <Check className="text-hi mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Closing CTA */}
      <section className="py-16">
        <div className="border-line bg-panel flex flex-col items-start gap-5 rounded-2xl border p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-ink text-2xl font-semibold tracking-tight">
              Start with a free preview.
            </h2>
            <p className="text-dim mt-2 max-w-md text-sm">
              Book a short call, tell me about the shop, and I will build a
              homepage preview before you decide anything.
            </p>
          </div>
          <BookCall label="Book a free call" />
        </div>
      </section>
    </div>
  );
}
