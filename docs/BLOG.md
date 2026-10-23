# Blog

No blog is published. `src/content.config.ts` reserves a Markdown collection
at `src/content/blog/en/` and `src/content/blog/pt-br/`. Entries default to
`draft: true`. An empty collection must not add routes or sitemap URLs.

Add a route only when a post is ready to publish. Drafts stay out of
production. Add `hreflang` only for a translation that exists, and describe
the post with `BlogPosting` data that matches the visible byline and dates.
