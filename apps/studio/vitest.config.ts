import { resolve } from "node:path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// Test-only config, kept separate from Next's Turbopack build. The `@/` alias
// mirrors tsconfig.json `paths` so imports resolve identically to the app.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
      // Resolve the shared workspace package to its TS source so vitest (swc)
      // transforms it, instead of treating the symlinked dep as untransformed
      // node_modules.
      "@akds/ui": resolve(__dirname, "../../packages/ui/src/index.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
