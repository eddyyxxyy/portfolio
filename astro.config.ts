import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  fonts: [
    {
      cssVariable: "--font-alegreya-sans",
      display: "swap",
      fallbacks: ["sans-serif"],
      name: "Alegreya Sans",
      provider: fontProviders.fontsource(),
      styles: ["normal"],
      subsets: ["latin"],
      weights: [400, 500, 700],
    },
    {
      cssVariable: "--font-exo-2",
      display: "swap",
      fallbacks: ["sans-serif"],
      name: "Exo 2",
      provider: fontProviders.fontsource(),
      styles: ["normal"],
      subsets: ["latin"],
      weights: [400, 500, 600, 700],
    },
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt-br"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          "pt-br": "pt-BR",
        },
      },
    }),
  ],
  root: ".",
  site: "https://www.edsonpimenta.net",
  trailingSlash: "ignore",
  image: {
    responsiveStyles: true,
  },
  markdown: {
    syntaxHighlight: "prism",
  },
  prefetch: false,
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "font-src 'self'",
        "form-action 'self'",
        "img-src 'self' data:",
        "manifest-src 'self'",
        "media-src 'self'",
        "object-src 'none'",
        "worker-src 'none'",
        "upgrade-insecure-requests",
      ],
      scriptDirective: {
        resources: ["'self'", "https://static.cloudflareinsights.com"],
      },
    },
  },
});
