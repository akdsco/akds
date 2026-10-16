// Our London / GBP pricing, adapted from the productised-service model. Numbers
// are a starting draft for the owner to tune against what he will actually
// deliver. The edge over a template agency is the automations, so the tiers lead
// with them rather than page counts alone.

export type Tier = {
  name: string;
  /** One-off build price in GBP. */
  price: number;
  /** Who it suits, one line. */
  best: string;
  /** Feature bullets. First item of non-first tiers is "Everything in <prev>". */
  features: string[];
  popular?: boolean;
};

export type CarePlan = {
  name: string;
  /** Monthly price in GBP. */
  price: number;
  blurb: string;
  features: string[];
  popular?: boolean;
};

export type AddOn = { name: string; price: number | null };

export const buildTiers: Tier[] = [
  {
    name: "Starter",
    price: 750,
    best: "A first proper site that turns searches into enquiries.",
    features: [
      "One-page site built around your best work",
      "Local SEO so you show up nearby",
      "Your Google reviews pulled in",
      "Lead capture and a booking link",
      "Two rounds of design feedback",
    ],
  },
  {
    name: "Business",
    price: 1800,
    best: "A shop with a few services that wants to be booked up.",
    popular: true,
    features: [
      "Everything in Starter",
      "Up to seven pages, a page per service",
      "Photo gallery of your work",
      "Advanced local SEO and Google Business setup",
      "Online booking synced to your calendar",
      "One automation: auto review requests after a visit",
    ],
  },
  {
    name: "Growth",
    price: 3500,
    best: "An established business pushing hard on local search.",
    features: [
      "Everything in Business",
      "Up to fifteen pages, a page per area you cover",
      "Analytics and call tracking",
      "Lead routing: enquiries land in your inbox and phone, instantly",
      "Review, reminder and follow-up automations",
      "Three rounds of design feedback",
    ],
  },
];

export const carePlans: CarePlan[] = [
  {
    name: "Essential",
    price: 39,
    blurb: "Keep the site live, safe and backed up.",
    features: [
      "Hosting, SSL and a custom domain",
      "Weekly backups",
      "Security and software updates",
      "Twenty minutes of content edits a month",
      "Email support",
    ],
  },
  {
    name: "Advanced",
    price: 99,
    blurb: "The site stays fresh and the automations keep running.",
    popular: true,
    features: [
      "Everything in Essential",
      "One hour of content edits a month",
      "Google Business kept current",
      "Monthly SEO tweaks and an enquiries report",
      "Automations monitored and kept running",
      "Priority next-day response",
    ],
  },
  {
    name: "Complete",
    price: 179,
    blurb: "A hands-off growth partner for a busy shop.",
    features: [
      "Everything in Advanced",
      "Two hours of content edits a month",
      "Continuous review requests and responses",
      "New automations built as you need them",
      "Speed and conversion checks",
      "Direct WhatsApp access",
    ],
  },
];

export const includedInEveryBuild: string[] = [
  "Custom design, no templates",
  "Fast on mobile and desktop",
  "Copy written for you",
  "Lead capture built in",
  "SSL and domain setup",
  "Google Maps and Business Profile",
  "Thirty days of support after launch",
];

export const addOns: AddOn[] = [
  { name: "Extra page", price: 150 },
  { name: "Online booking calendar", price: 150 },
  { name: "Logo and brand basics", price: 300 },
  { name: "Photo cleanup, your best thirty shots", price: 200 },
  { name: "Move an old site over with redirects", price: 200 },
  { name: "A custom automation", price: null },
];

// Trust block: the objections a local owner has before they ever read a price.
export const guarantees: string[] = [
  "A fixed price, agreed in writing before any work starts",
  "A free homepage preview first. You pay nothing until you approve it",
  "You own the site, the code and the domain",
  "Moving an existing site and domain over is free, no exit fee",
  "No lock-in. The care plan has no contract and cancels any time",
];
