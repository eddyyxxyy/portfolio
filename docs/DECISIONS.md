# Decisions

## Static output

The site is static Astro output on Cloudflare Pages, uploaded from GitHub
Actions with Wrangler. A server runtime is not needed for the current pages, so
there is no `@astrojs/cloudflare` adapter, Pages Function, or Worker. Response
headers come from `public/_headers`.

## Analytics

Cloudflare Web Analytics is the only measurement. It is injected by the
Cloudflare zone, sets no cookie, and is limited to the two hosts named in the
CSP. No other analytics tag is allowed.

## No service worker

Ordinary HTTP caching is enough. A service worker can keep stale HTML after a
bilingual update.

## No client router

Navigation is native. That avoids a client bundle and keeps fragment links
working with the build-time CSP.

## Local fonts and images

Astro Fonts serves the selected weights from this origin. Responsive raster
images use Astro assets. SVGs are not rasterized.
