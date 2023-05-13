# App

Gympass style app

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de checkins realiados pelo usuário logado;
- [x] Deve ser possível o usuário obter o histório de checkins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar checkin em uma academia;
- [x] Deve ser possível validar o checkin de um usuário;
- [x] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com e-mail duplicado;
- [x] O usuário não pode fazer 2 checkins no mesmo dia;
- [x] O usuário não pode fazer checkin se não estiver perto (100m) da academia;
- [x] O checkin só pode ser validado até 20 minutos depois de criado;
- [ ] O checkin só pode ser validado por administradoes;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um JWT(Jason Web Token);

## Setup
- `npm init -y `;
- `npm i typescript @types/node tsx tsup -D`;
- Run `npx tsc -- init` to create tsconfig.json and change the target to es2020;
- `npm i fastify`;
- Divide the application in 2 files, server.ts and app.ts
- Create the script to run the application:
    - "start:dev": "tsx watch src/server.ts" - Run the app in dev enviroment;
    - "start": "node build/server.js" - Run the app in prod enviroment (Run after the build);
    - "build": "tsup src --out-dir build" - Transform the ts files in js files and direct to folder build(Used to production);
- Create .npmrc to set the package manager and fix the dependencies of package.json(Always when run npm is);
- Create .env and .env.example;
- Run `npm i dotenv` essa lib irá fazer o parse das variáveis de ambiente setadas no .env em variáveis node(nativas, process.env);
- Create a folder env with index.ts and import "dotenv/config";
- Run `npm i zod` to validate the variables in env/index.ts;
- Run `npm i eslint @rocketseat/eslint-config -D`;
- Go to tsconfig.json and uncomment the key baseUrl and add to the path the alias to import files from the baseUrl;
- Run `npm i bcryptjs` and `npm i -D @types/bcryptjs` to encrypth password;

## ORM (Object Relational Mapper)
- Run `npm i prisma -D` to install prisma;
- Run `npx prisma init` to generate folder prisma with schema.prisma;
- Open Command Pallet -> User Settings and add this:
    "[prisma]": {
        "editor.formatOnSave": true
    }
- Run `npx prisma generate` to create the types of the schema.prisma(after create the models in schema.prisma);
- Go to node_modules/.prisma/client/index.d.ts and check if exists the model created in schema.prisma;
- Run `npm i @prisma/client`

## Docker 

- See hub.docker.com;
- Use images from bitnami(They give more security to these images);
- Run `docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql`
- Run `docker ps` to see the containers running
- Run `docker ps -a` to see all containers that already running;
- Run `docker start ID_CONTAINER or NAME_CONTAINER` to setup the container;
- Run `docker stop ID_CONTAINER or NAME_CONTAINER` to stop the container;
- Run `docker rm ID_CONTAINER or NAME_CONTAINER` to delete this container;
- Run `docker logs ID_CONTAINER or NAME_CONTAINER` to see the logs;
- Change your DATABASE_URL(created by default for prisma) in .env to "postgresql://docker:docker@localhost:5432/apisolid?schema=public"
- Run `npx prisma migrate dev` to create the migration;
    - This command will mapper all changes that occurs in your schema.prisma and created the migrations based on that.
- Run `npx prisma studio` to oppen on your browser a interface to navigate on your tables;

## Docker Compose

- Create a docker-compose.yml that will list all containers that has in the application;
- Run `docker compose up -d` to start and `docker compose down` to stop and delete all data from this container;
- Prefer to use `docker compose stop` to not delete all data from container;

## Vitest

- Run `npm i vitest vite-tsconfig-paths -D`;
- vite-tsconfig-paths it`s a plugin to vitest understand the paths sets in the tsconfig.json(imports that has @/);
- Create a file called vite.config.ts;
- Create a script to run the vitest on your package.json;
- Run `npm i -D @vitest/ui` to install ui from vitest;
- Create a script to run vitest/ui
- Run `npm i dayjs` to work with dates;

## JWT

- Json Web Token;
- Usuário faz login, envia e-mail/senha, o back-end cria um token ÚNICO, não modificável e STATELESS;
- Back-end: Quando vai criar o token ele usa uma PALAVRA-CHAVE(Normalmente é uma string);
- Palavra-chave: fiuahifuaiuehwfiuhgauifhgauiwhahsuida(literalmente qualquer coisa);
- O token gerado é dividido em header.payload.sign(palavra-chanve);
- Qualquer alteração que ocorroa ou no header ou no payload(por interceptação) o sign gerado pela palavra chave também irá mudar. (jwt.io)
- Faz login -> back-end gera um JWT - E esse jwt é utilizado em todas as requisições dali pra frente;
- O JWT é enviado pelo authorization do Header através do Bearer JWT (e náo do basic authorization);
- Run `npm i @fastify/jwt`;

## TE2E

- Simular a aplicação de ponta a ponta;
- O usuário nesse caso é o front-end;
- Precisa utilizar um banco de dados separado para testes;
- Separar o banco de dados por switch de testes;
- Cada teste precisa rodar em um ambiente totalmente isolado;
- Ter um banco limpo a cada execução de um teste começa a se tornar menos perfomático;
- Utilizar o conceito de teste enviroment;
- Dentro da pasta prisma, criar uma pasta chamada vitest-environment-prisma e executar `npm init -y` dentro dela;
- Remover o scripts do package gerado nessa pasta;
- Criar um arquivo chamado prisma-test-environment.ts e setar no main(arquivo principal do pacote) do package;
- Exportar do arquivo prisma-test-environment.ts a configuração isolada de cada teste;
- Começar a testar pelo src/http/controllers;
- Nas configs do vitest(vite.config.ts) criar um objeto test com a propriedade environmentMatchGlobs com o caminho dos testes que desejamos que tenha esse ambiente isolado e o segundo parâmetro sendo o "nome final" do pacote que contém as configurações desse ambiente, no caso, de "vitest-environment-prisma" como "prisma";
- Entrar no pacote vitest-environment-prisma e executar `npm link` o npm irá criar para esse pacote como se fosse um repositório local na máquina e voltando na aplicação global, instalar esse pacote que ficou disponível localmente através do comando `npm link vitest-environment-prisma`, dessa forma poderemos executar os testes pois a aplicação global irá entender que existe um pacote chamado vitest-environment-prisma;


