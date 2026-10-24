# Security

## Controls

- Astro generates a hash-based CSP during the build.
- Assets and fonts are served from the same origin.
- External links opened in new tabs use `noopener noreferrer`.
- The project has no forms, cookies, analytics, secrets, server code, or user
  input processing.
- Dependencies are installed from the lockfile and audited in CI.
- GitHub Actions run with read-only repository permissions. The Cloudflare
  API token is an environment secret read only by the deploy job, which never
  installs project dependencies.
- Dependabot covers npm and GitHub Actions.

The CSP meta element can protect scripts, styles, images, fonts, connections,
objects, workers, forms, and base URLs. `frame-ancestors` cannot be enforced by
a meta element. GitHub Pages had no repository-controlled response headers, so
the previous host left clickjacking open. Cloudflare Pages serves real headers
from `public/_headers` on every route:

- `X-Frame-Options: DENY` blocks framing.
- `X-Content-Type-Options: nosniff` blocks MIME sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin` keeps paths out of
  cross-origin referrers.
- `Permissions-Policy` turns off camera, microphone, and geolocation.
- `Strict-Transport-Security` requires HTTPS for one year on the domain and
  every subdomain. `preload` only takes effect after submission to
  [hstspreload.org](https://hstspreload.org/), and removal from browser lists
  takes months.

`*.pages.dev` hosts also send `X-Robots-Tag: noindex`, so only
`www.edsonpimenta.net` is indexed. `scripts/verify-build.mjs` fails if any of
these rules is missing or if the build emits `_worker.js`, `_routes.json`, or
`functions/`.

## Review checklist

- Do not add secrets to `PUBLIC_` variables or generated HTML.
- Do not add third-party scripts without privacy, security, and performance
  review.
- Pin Actions to immutable commit SHAs.
- Run `npm run quality` and require zero high-severity audit findings.
- Test CSP against `astro build` plus `astro preview`; Astro does not enforce
  this feature in the development server.

## Primary references

- [Astro CSP configuration](https://docs.astro.build/en/reference/configuration-reference/#securitycsp)
- [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP CSP cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [GitHub Actions secure use](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
- [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/)
