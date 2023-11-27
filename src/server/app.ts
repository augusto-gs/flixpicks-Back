import "dotenv/config";
import express from "express";
import debugCreator from "debug";
import chalk from "chalk";
import helmet from "helmet";

const debug = debugCreator("movies:server:app");

const app = express();
app.use(helmet());

export const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.green(`Listening on port ${chalk.blue(port)}`));
  });
};

export default app;
