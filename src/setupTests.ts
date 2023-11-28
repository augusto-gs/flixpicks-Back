import "dotenv/config.js";
import "./server/index.js";
import MongoMemoryServer from "mongodb-memory-server-core";
import { connectToDatabase } from "./database";
import mongoose from "mongoose";
import Movie from "./features/movies/model/Movies.js";
import { moviesMock } from "./features/movies/mocks/moviesMock.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongodbUrl = server.getUri();
  await connectToDatabase(mongodbUrl);
});

afterAll(async () => {
  await server.stop();
  await mongoose.disconnect();
});
