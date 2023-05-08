import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "node:path";
import { loadConfigFromFile, mergeConfig } from "vite";

const baseURL = process.env.STORYBOOK_BASE ?? "";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    const file = await loadConfigFromFile({
      command: "build",
      mode: process.env.NODE_ENV ?? "development",
    }, resolve(__dirname, "../vite.config.ts"));

    return mergeConfig(config, {
      ...file?.config ?? {},
      base: baseURL,
      optimizeDeps: {
        include: ["storybook-dark-mode"],
      },
    });
  },
};
export default config;
