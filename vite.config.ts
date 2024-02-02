/// <reference types="vitest/globals" />
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      "@storybook/jest": "vitest",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    includeSource: ["src/**/*.{js,ts}"],
    setupFiles: "./vitest-setup.ts",
  },
});
