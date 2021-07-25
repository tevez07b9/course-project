## Architecture

Backend:
Database: Postgres
Server: Express with Apollo Server
API: graphql using type-graphql
ORM: typeorm - could have used Prisma with nexus as well
Code: Typescript
Frontend:
Framework: NextJS with Typescript
UI: Chakra UI - But i favourite now is Tailwind CSS.
GraphqlClient: Urql - coz it has better caching i feel
Specials - graphql generator to generate graphql hooks
Others - react-hook-form for forms

## Setup

1. Cofigure postgres sql using ormconfig.json file
2. setup envs using .env.example
3. setup redis on localhost
4. run migrations with npm run migrate
5. run server with npm run start:dev on server dir
6. run client with npm run dev on client dir

## Final words

Could have addded more features if given more time,
tried to have nodemailer auth, dashborad, api validaitions, frontend caching, and much more. but ran out of time.
