# Architecture

The site is pre-rendered by Astro and published as static files. There is no
server adapter, database, API, hydration directive, service worker, or
generated JavaScript bundle. Two inline scripts set the theme before paint and
wire the theme select.

`/` and `/pt-br/` render `HomePage.astro` with locale-specific copy. The shared
shell is `BaseLayout.astro`, `Header.astro`, and `Footer.astro`.

Routes, languages, and fragments are ordinary links. The mobile menu uses the
Popover API. Theme preference is stored under `portfolio-theme`. Raster images
go through Astro assets; SVGs are copied through. Fonts are self-hosted by
Astro Fonts.

- `src/` holds pages, components, copy, styles, and source assets.
- `public/` is copied unchanged, including `llms.txt`, the portrait, and the
  Open Graph image.
- `dist/` is generated. Do not edit it.
- `scripts/verify-build.mjs` checks the generated output.
