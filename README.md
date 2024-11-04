# Code Challenge PUMA - UnB

As regras de negócio do desafio podem ser lidas no [repositório oficial do desafio](https://github.com/jeffersonfelixdev/puma-code-challenge).

## Rodando este projeto:

Primeiramente, insira seu `token` da API do GitHub no arquivo `example.env` do app `backend` em `apps/backend/example.env` e o renomeie para `.env`.

```
GITHUB_TOKEN=github_seutoken_
```

O projeto foi criado utilizando `Turborepo`, portanto, instale todas as dependências (backend e frontend) desse projeto executando o seguinte comando na pasta raíz:

```sh
pnpm install
```

e, logo após, para inicializar os apps (backend e frontend) apenas dispare o comando:

```sh
pnpm run dev
```

---

## Escolha dos Frameworks

### DevOps:
**TurboRepo**:
- Utilizei turborepo para facilitar rodar os dois projetos num só monorepo; além disso fica fácil centralizar os testes e linting.

### BackEnd:
**Fastify**:
- a CLI permite gerar um esqueleto de rotas altamente extensível;
- contém um modelo de estrutura com plugins, serviços, rotas e testes, facilitando a construição com escalabilidade da API;
- excelentes pacotes nativos como Cors e Sensible, acelerando o desenvolvimento;

### FrontEnd:

- **Vite**: acelera a velocidade de desenvolvimento e building do projeto, além de facilitar configurações de plugins e testes;
- **VueJS**: rápido para construir telas simples e performáticas sem a necessidade de importar muitas bibliotecas ou configurar hooks e estados (ideal para essa aplicação).
- **TailwindCSS**: Velocidade para moldar o projeto do jeito que eu quero e de forma rápida, além da facilidade para construir grids.



