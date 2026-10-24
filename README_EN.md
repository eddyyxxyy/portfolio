[![Edson Pimenta's portfolio](./.github/docs/img/readme_banner.jpeg)](https://www.edsonpimenta.net)

> [Leia esta documentação em português](./README.md).

# Edson Pimenta's portfolio

A bilingual, static, content-first portfolio about growth engineering, AI
systems, and high-scale web architecture.

## Stack

- Astro 7 and TypeScript;
- native HTML and CSS with minimal inline JavaScript;
- Astro-managed fonts and responsive images;
- GitHub Actions quality gates and Cloudflare Pages deployment;
- Node.js 24 and npm 11.

## Development

```sh
nvm use
npm ci
npm run dev
```

Fast validation:

```sh
npm run quality
```

Complete validation, including mobile and desktop Lighthouse runs for both
locales:

```sh
npm run quality:full
```

## Decisions and operations

- [Architecture](./docs/ARCHITECTURE.md)
- [Search and discovery](./docs/SEO.md)
- [Performance](./docs/PERFORMANCE.md)
- [Security](./docs/SECURITY.md)
- [Reserved blog](./docs/BLOG.md)
- [Technical decisions](./docs/DECISIONS.md)

The site has no analytics, server runtime, client router, service worker, or
résumé download.

## Optional containers

```sh
docker compose up --build
docker compose -f docker-compose.prod.yaml up --build
```

## License

[MIT](./LICENSE.md)
