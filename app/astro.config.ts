import { defineConfig } from "astro/config";
import node from '@astrojs/node';

export default defineConfig({
  site: "https://www.edsonpimenta.net",
  trailingSlash: "always",
  cacheDir: "./cache",
  output: "hybrid",
  adapter: node({
    mode: "standalone",
  }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt-br"],
    routing: {
      strategy: "pathname",
      prefixDefaultLocale: false,
    },
    fallback: {
      "pt-br": "en",
    },
  },
});
