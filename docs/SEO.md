# Search and discovery

The HTML pages are the source of truth. JSON-LD repeats visible facts.
`llms.txt` is a discovery aid and must not add claims the pages do not make.

- One indexable URL per locale, canonical to itself.
- Reciprocal `hreflang` for `en-US`, `pt-BR`, and `x-default`.
- A sitemap with only those two URLs.
- `404.html` is `noindex, follow`.
- Titles and descriptions are unique and factual.
- The Open Graph image is the local 1200×630 file.
- The person portrait is `/edson-pimenta.webp`.
- `ProfilePage.dateModified` changes only when the profile content changes.
- SchematicLD lists Edson as author and Gran as copyright holder, with no
  repository URL.
- No FAQ, ratings, reviews, or awards that the page does not show.

After a production deploy, check both URLs in the Rich Results Test and submit
`https://www.edsonpimenta.net/sitemap-index.xml` in Search Console.
