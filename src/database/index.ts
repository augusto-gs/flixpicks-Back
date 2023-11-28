import chalk from "chalk";
import debugCreator from "debug";
import mongoose from "mongoose";

export const debug = debugCreator("movies:src:database");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.bgBlueBright("Connected to database"));
  } catch (error) {
    debug(chalk.redBright("Failed to connect to database"));
  }
};
