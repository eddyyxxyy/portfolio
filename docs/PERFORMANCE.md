# Performance

`npm run quality` enforces the generated-output limits:

- no JavaScript bundle;
- at most 64 KiB of generated CSS;
- at most seven WOFF2 files and 256 KiB of fonts;
- no optimized raster image above 40 KiB;
- no generated page HTML above 150 KiB.

`npm run lighthouse` checks English and Portuguese on mobile and desktop.
The first browser pass is discarded; it only decodes the local fonts.
Accessibility, Best Practices, and SEO must score 100. Performance must be at
least 95. Lab targets are LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms, FCP ≤ 1.8 s,
and Speed Index ≤ 3.4 s.

Field Core Web Vitals need production traffic. This site does not claim them.
Search Console is the report to use after the domain has traffic.
