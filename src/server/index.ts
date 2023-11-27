import app from "./app.js";
import morgan from "morgan";
import cors from "cors";

app.use(morgan("dev"));

const corsWhitelist = [
  "https://augusto-gomez-202309-bcn-front.netlify.app/",
  `http://localhost:${process.env.PORT}/`,
];

app.use(
  cors({
    origin: corsWhitelist,
  }),
);
