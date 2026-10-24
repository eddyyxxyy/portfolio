# Decisions

## Static output

The site is static Astro output on Cloudflare Pages, uploaded from GitHub
Actions with Wrangler. A server runtime is not needed for the current pages, so
there is no `@astrojs/cloudflare` adapter, Pages Function, or Worker. Response
headers come from `public/_headers`.

## No analytics

There is no analytics tag. Reconsider only for a measurement that would change
a specific decision.

## No service worker

Ordinary HTTP caching is enough. A service worker can keep stale HTML after a
bilingual update.

## No client router

Navigation is native. That avoids a client bundle and keeps fragment links
working with the build-time CSP.

## Local fonts and images

Astro Fonts serves the selected weights from this origin. Responsive raster
images use Astro assets. SVGs are not rasterized.
