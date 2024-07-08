[![](./.github/docs/img/readme_banner.jpeg)](https://www.edsonpimenta.net)

> Click this link to read the [documentation for english speakers](./README_EN.md).

# Meu Portfólio

**Acesse: [Portfólio do Edson Pimenta](https://www.edsonpimenta.net)**

Olá! Sou **Edson Pimenta**, um **desenvolvedor full-stack** em constante evolução, **apaixonado por aprender** e por **construir soluções** que fazem diferença na vida das pessoas. Estou animado para compartilhar meu mais recente projeto: um **portfólio pessoal** construído usando **Astro** e **TypeScript** como suas principais tecnologias!

## Ambiente de Desenvolvimento

Com foco na **entrega de conteúdo útil e performático**, optei pelas seguintes tecnologias:

- _Astro_;
- _TypeScript_;
- _Docker_.

E para a **consistência de estilo e qualidade de código**:

- _Husky_;
- _ESLint_;
- _Prettier_;
- _Commitlint_;
- _Lint Staged_;
- _Simple Import Sort_.

### Em relação a containers Docker

Além disso, "_dockerizei_" a aplicação para ter um ambiente de desenvolvimento utilizando o próprio servidor do Astro e um ambiente de produção com Nginx, ambos facilmente acessíveis à partir de suas imagens orquestradas pelo `docker compose`. Acesse-os com os seguintes comandos em seu terminal:

```bash
# Ambiente de desenvolvimento:
docker compose up --build

#Ambiente de produção:
docker compose -f docker-compose.prod.yaml --build
```

> `--build` só é necessário caso você queria realmente "_buildar_" as imagens da aplicação.

Dessa forma você terá acesso na porta 3000 do seu computador à aplicação, em ambos os ambientes. Só será necessário, após subir o container de sua preferência, acessar: http://localhost:3000/.

## Licença

Distribuído sob licença MIT. Veja [`LICENSE`](./LICENSE.md) para mais informações.

## Contato

Links úteis:

- [Acesse meu Portfólio](https://www.edsonpimenta.net)
- [Confira todos os meus projetos](https://github.com/eddyyxxyy)
- [Conecte-se comigo no LinkedIn](https://www.linkedin.com/in/eeddyyxxyy/)
- [Assista meus vídeos no Youtube](https://www.youtube.com/@eddyxide)
- [Me mande um e-mail](mailto:dev.eddyyxxyy@gmail.com?)
