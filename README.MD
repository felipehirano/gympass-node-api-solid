# App

Gympass style app

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de checkins realiados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o histório de checkins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realixar checkin em uma academia;
- [ ] Deve ser possível validar o checkin de um usuário;
- [ ] Deve ser possível cadastrarr uma academia;


## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com e-mail duplicado;
- [ ] O usuário não pode fazer 2 checkins no mesmo dia;
- [ ] O usuário não pode fazer checkin se não estiver perto (100m) da academia;
- [ ] O checkin só pode ser validado até 20 minutos depois de criado;
- [ ] O checkin só pode ser validado por administradoes;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 items por página;
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