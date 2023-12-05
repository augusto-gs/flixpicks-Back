import { Joi, validate } from "express-validation";
import { type MovieStructure } from "../types";

const movieSchema = {
  body: Joi.object<Omit<MovieStructure, "_id">>({
    name: Joi.string().required(),
    director: Joi.string().required(),
    writer: Joi.string().required(),
    stars: Joi.array().items(Joi.string()).required(),
    releaseDate: Joi.date().required(),
    genre: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required().min(10).max(500),
    imageUrl: Joi.string(),
    score: Joi.string().min(1).max(3),
    isSeen: Joi.boolean().strict().required(),
  }),
};

const movieValidation = validate(
  movieSchema,
  {},
  { abortEarly: false, dateFormat: "date" },
);

export default movieValidation;
