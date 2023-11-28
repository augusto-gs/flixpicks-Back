import { Router } from "express";
import MovieMongooseRepository from "../repository/MoviesMongooseRepository.js";
import MovieController from "../controller/MovieController.js";

export const moviesRouter = Router();

const movieRepository = new MovieMongooseRepository();
const moviesController = new MovieController(movieRepository);

moviesRouter.get("/", moviesController.getMovies);
