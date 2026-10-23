# Security

## Controls

- Astro generates a hash-based CSP during the build.
- Assets and fonts are served from the same origin.
- External links opened in new tabs use `noopener noreferrer`.
- The project has no forms, cookies, analytics, secrets, server code, or user
  input processing.
- Dependencies are installed from the lockfile and audited in CI.
- GitHub Actions receive read-only permissions unless a deployment job
  explicitly needs Pages permissions.
- Dependabot covers npm and GitHub Actions.

The CSP meta element can protect scripts, styles, images, fonts, connections,
objects, workers, forms, and base URLs. `frame-ancestors` cannot be enforced by
a meta element. GitHub Pages does not provide repository-controlled response
headers, so clickjacking headers require a host or proxy that supports custom
headers.

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
