// Real client + internal builds shown on the site. Copy here is a working draft:
// keep claims honest and let the owner chisel exact wording on the rendered page.
// Never invent metrics or details about a client's business.

export type WorkItem = {
  /** Business / project name. */
  name: string;
  /** Live site, used as the card link. */
  url: string;
  /** What the business is, in a couple of words. */
  kind: string;
  /** City / area, for the local framing. */
  location: string;
  /** One or two plain sentences. No invented numbers. */
  blurb: string;
  /** What was built, as short chips. */
  built: string[];
  status: "live" | "in progress";
};

export const work: WorkItem[] = [
  {
    name: "Jo Hair Studio",
    url: "https://johairstudio.uk",
    kind: "Hair studio",
    location: "London",
    blurb:
      "A site for a London hair studio, built to turn a search into a booking. Clear services, prices and a booking link up front.",
    built: ["Website", "Booking link", "Local SEO", "Reviews"],
    status: "live",
  },
  {
    name: "Way Cycles",
    url: "https://waycycles.co.uk",
    kind: "Cycling shop",
    location: "London",
    blurb:
      "A site for an independent London cycling shop, covering the shop, its services and the way to get in touch.",
    built: ["Website", "Service pages", "Local SEO"],
    status: "in progress",
  },
  {
    name: "akds.dev",
    url: "https://akds.dev",
    kind: "Internal build",
    location: "London",
    blurb:
      "Our own engineering portfolio, built from the same toolkit. Proof the studio builds what it sells, not just templates.",
    built: ["Website", "Design system", "Static export", "Cloudflare"],
    status: "live",
  },
];
