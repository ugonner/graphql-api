import express, { Express } from "express";
import { buildSchema } from "graphql";
import { todoGraphqlSchema } from "./todo/todo.schema";
import { ApolloServer } from "@apollo/server";
import { todoResolver } from "./todo/todo.resolver";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = new ApolloServer({
  typeDefs: todoGraphqlSchema,
  resolvers: todoResolver,
});

(async () => {
  const mongoUri =
    "mongodb+srv://jonapwdanambra:jQC7buhXH2f8bEqH@cluster0.pfiyczu.mongodb.net/tododb?retryWrites=true&w=majority&appName=Cluster0";
  await mongoose.connect(mongoUri);
  await server.start();

  //exposed mongo uri cos this is a test app

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {})
  );
})();
const PORT = process.env.PORT;
app.listen(4000, () => console.log("app running on port", PORT));
export default app;
