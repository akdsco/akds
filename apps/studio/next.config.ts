import { join } from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Monorepo: point Next at the workspace root (two levels up) so it stops
  // guessing which root to trace from and drops the "inferred workspace root"
  // warning. One lockfile lives there.
  turbopack: { root: join(__dirname, "..", "..") },

  // Static export: `next build` emits plain HTML/CSS/JS to `out/`, which
  // Cloudflare Pages serves directly. The site is 100% statically renderable
  // (every dynamic route has generateStaticParams; no API routes, Server
  // Actions, ISR or cookies), so no server runtime is needed.
  output: "export",

  // The default next/image loader runs on a server, which a static export has
  // none of. Serve the committed images as-is. Only hero.tsx uses next/image.
  images: { unoptimized: true },

  // @akds/ui ships TypeScript source (no build step); Next compiles it here.
  transpilePackages: ["@akds/ui"],
};

export default nextConfig;
