import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const routes = ["", "/pricing"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
