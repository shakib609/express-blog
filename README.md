# express-blog

Simple Blog created using Express.js

### Packages Used

- typeorm
- passport
- class-validator

### Setup

#### Pre-Requisites

- docker-compose
- Node.js 16+
- yarn

#### Running Locally

- Create `.env` file by copying demo values from `.env.example`
- Start up the postgres db server: `docker-compose up -d`
- Install all the dependencies: `yarn install`
- Start typescript watcher using: `yarn watch`
- In a separate terminal run dev server: `yarn dev`

#### Production

- Build the project: `yarn build`
- Run server: `yarn start`

P.S. Make sure to set the required environment variables when running in production.
