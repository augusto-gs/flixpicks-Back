import { Schema, model } from "mongoose";
import { type MovieStructure } from "../types";

const movieSchema = new Schema<MovieStructure>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  director: { type: String, required: true },
  genre: { type: String, required: true },
  imageUrl: { type: String, required: true },
  releaseDate: { type: String, required: true },
  stars: { type: String, required: true },
  writer: { type: String, required: true },
  score: { type: String },
});

const Movie = model("Movie", movieSchema, "movies");

export default Movie;
