import "dotenv/config";
import app from "./app.js";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import generalError from "./middlewares/errors/generalError.js";
import endpointNotFound from "./middlewares/errors/endpointNotFound.js";
import { pingRouter } from "../features/ping/router/pingRouter.js";

app.use(morgan("dev"));

app.use(express.json());

const corsWhitelist = [
  "https://augusto-gomez-202309-bcn-front.netlify.app/",
  `http://localhost:${process.env.PORT}/`,
];

app.use(
  cors({
    origin: corsWhitelist,
  }),
);
app.use("/", pingRouter);
app.use(endpointNotFound);
app.use(generalError);
