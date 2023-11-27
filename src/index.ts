import "dotenv/config";
import "./server/index.js";
import { startServer } from "./server/app.js";
import { connectToDatabase } from "./database/index.js";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("movies:index");

const port = process.env.PORT ?? 4000;

if (!process.env.MONGODB_URL) {
  debug(chalk.bgRedBright("Missing MongoDV Connection String"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);
startServer(+port);
