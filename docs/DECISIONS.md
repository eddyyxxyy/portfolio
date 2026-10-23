# Decisions

## Static output

The site is static Astro output on GitHub Pages. A server runtime is not
needed for the current pages.

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
