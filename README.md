[![Portfólio de Edson Pimenta](./.github/docs/img/readme_banner.jpeg)](https://www.edsonpimenta.net)

> [Read this documentation in English](./README_EN.md).

# Portfólio de Edson Pimenta

Portfólio bilíngue, estático e orientado a conteúdo sobre growth engineering,
sistemas de IA e arquitetura web de alta escala.

## Stack

- Astro 7 e TypeScript;
- HTML e CSS nativos, com JavaScript inline mínimo;
- fontes e imagens processadas pelo Astro;
- GitHub Actions para qualidade e publicação no Cloudflare Pages;
- Node.js 24 e npm 11.

## Desenvolvimento

```sh
nvm use
npm ci
npm run dev
```

Validação rápida:

```sh
npm run quality
```

Validação completa, incluindo Lighthouse em inglês e português para mobile e
desktop:

```sh
npm run quality:full
```

## Decisões e operação

- [Arquitetura](./docs/ARCHITECTURE.md)
- [Busca e descoberta](./docs/SEO.md)
- [Performance](./docs/PERFORMANCE.md)
- [Segurança](./docs/SECURITY.md)
- [Reserva do blog](./docs/BLOG.md)
- [Decisões técnicas](./docs/DECISIONS.md)

O site não usa analytics, runtime de servidor, roteador cliente, service worker
ou download de currículo.

## Containers opcionais

```sh
docker compose up --build
docker compose -f docker-compose.prod.yaml up --build
```

## Licença

[MIT](./LICENSE.md)
