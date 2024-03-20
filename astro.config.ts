import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt-br"],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      "pt-br": "en",
    },
  },
  integrations: [sitemap({
    i18n: {
      defaultLocale: "en",
      locales: {
        en: "en-US",
        "pt-br": "pt-BR",
      },
    },
  }), icon()],
  root: ".",
  site: "https://www.edsonpimenta.net",
  trailingSlash: "ignore",
});
