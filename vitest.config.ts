import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  test: {
    env: {
      NEXT_PUBLIC_SUPABASE_URL:
        "https://placeholder.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "placeholder-anon-key",
    },
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "app/**/*.test.{ts,tsx}",
      "e2e/support/**/*.test.ts",
      "scripts/**/*.test.mjs",
    ],
  },
});
