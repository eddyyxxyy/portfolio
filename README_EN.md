[![](./.github/docs/img/readme_banner.jpeg)](https://www.edsonpimenta.net)

> Click this link to read the [documentation for Portuguese speakers](./README.md).

# My Portfolio

**Visit: [Edson Pimenta's Portfolio](https://www.edsonpimenta.net)**

Hello! I'm **Edson Pimenta**, a **full-stack developer** constantly evolving, **passionate about learning** and **building solutions** that make a difference in people's lives. I'm excited to share my latest project: a **personal portfolio** built using **Astro** and **TypeScript** as its main technologies! 🚀

## Development Environment

Focusing on the **delivery of useful and performant content**, I chose the following technologies:

- _Astro_;
- _TypeScript_;
- _Docker_.

And for **style consistency and code quality**:

- _Husky_;
- _ESLint_;
- _Prettier_;
- _Commitlint_;
- _Lint Staged_;
- _Simple Import Sort_.

### About Docker containers

Besides all that, I've "dockerized" the application for both development and production environments, using the Astro server for the development env and Nginx for production. Both are orchestrated by `docker compose`, access them easily with the following commands on your terminal:

```bash
# Development environment:
docker compose up --build

# Production environment:
docker compose -f docker-compose.prod.yaml --build
```

> `--build` on those commands are only necessary if you want to actually build the application image.

Just by doing that you'll be able to access through port 3000 of your computer the application, both the envs are being served through the same port. It will be necessary, after running the selected container, access: http://localhost:3000/.

## License

Distributed under the MIT license. See [`LICENSE`](./LICENSE.md) for more information.

## Contact

Useful links:

- [Visit my Portfolio](https://www.edsonpimenta.net)
- [Check out all my projects](https://github.com/eddyyxxyy)
- [Connect with me on LinkedIn](https://www.linkedin.com/in/eeddyyxxyy/)
- [Watch my videos on Youtube](https://www.youtube.com/@eddyxide)
- [Send me an email](mailto:dev.eddyyxxyy@gmail.com?)
