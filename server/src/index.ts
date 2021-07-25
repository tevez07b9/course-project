import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";
import { CourseResolver } from "./resolvers/CourseResolver";
import { PurchaseResolver } from "./resolvers/PurchaseResolver";

declare module "express-session" {
  export interface SessionData {
    userID: number;
  }
}

const main = async () => {
  await createConnection();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: [
        process.env.CORS_ORIGIN as string,
        "https://studio.apollographql.com",
      ],
      credentials: true,
    })
  );
  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: false,
        secure: true,
        sameSite: "lax", // csrf
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, CourseResolver, PurchaseResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT as string), () => {
    console.log(
      `server started on http://localhost:${process.env.PORT}/graphql`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
