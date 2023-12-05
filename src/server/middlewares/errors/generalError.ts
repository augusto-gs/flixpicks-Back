import "./endpointNotFound.js";
import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../CustomError/CustomError.js";
import debugCreator from "debug";
import chalk from "chalk";
import { ValidationError } from "express-validation";

const debug = debugCreator("movies:server:middlewares:errors");

const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ValidationError) {
    const validationError = error.details.body?.reduce(
      (errorMessage, joiError) => `${errorMessage}, ${joiError.message}`,
      "",
    );

    const validationErrorModified = validationError
      ?.replace(/,(\s)/, "")
      .replaceAll(/['"]+/g, "");

    (error as CustomError).customMessage = validationErrorModified;
    debug(chalk.red(validationErrorModified));
  }

  const statusCode = error.statusCode ?? 500;
  const privateMessage = error.customMessage ?? error.message;
  debug(chalk.red("Error: ", privateMessage));

  res.status(statusCode).json({ error: privateMessage });
};

export default generalError;
