## Architecture

### Backend:

1. Database: Postgres
2. Server: Express with Apollo Server
3. API: graphql using type-graphql
4. ORM: typeorm - could have used Prisma with nexus as well
5. Code: Typescript

### Frontend

1. Framework: NextJS with Typescript
2. UI: Chakra UI - But i favourite now is Tailwind CSS.
3. GraphqlClient: Urql - coz it has better caching i feel
4. Specials - graphql generator to generate graphql hooks
5. Others - react-hook-form for forms

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
