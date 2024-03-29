import "dotenv/config";
import app from "./app.js";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import generalError from "./middlewares/errors/generalError.js";
import endpointNotFound from "./middlewares/errors/endpointNotFound.js";
import { pingRouter } from "../features/ping/router/pingRouter.js";
import { moviesRouter } from "../features/movies/router/moviesRouter.js";
import { userRouter } from "../features/user/router/userRouter.js";

app.use(morgan("dev"));

app.use(express.json());

const corsWhitelist = [process.env.ALLOWED_ORIGIN!];

app.use(
  cors({
    origin: corsWhitelist,
  }),
);

app.use("/", pingRouter);

app.use("/movies", moviesRouter);

app.use("/user", userRouter);

app.use(endpointNotFound);

app.use(generalError);
