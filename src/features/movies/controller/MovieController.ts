import { type NextFunction, type Request, type Response } from "express";
import type MovieMongooseRepository from "../repository/MoviesMongooseRepository";
import CustomError from "../../../server/CustomError/CustomError.js";
import { type MovieRequestWithoutId } from "../types";

class MovieController {
  constructor(public moviesRepository: MovieMongooseRepository) {}

  getMovies = async (_req: Request, res: Response): Promise<void> => {
    const movies = await this.moviesRepository.getMovies();

    res.status(200).json({ movies });
  };

  deleteMovie = async (
    req: Request<{ movieId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { movieId } = req.params;

    try {
      await this.moviesRepository.deleteMovie(movieId);

      res.status(200).json({});
    } catch {
      const error = new CustomError("Couldn't delete movie", 400);

      next(error);
    }
  };

  addMovie = async (
    req: MovieRequestWithoutId,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const movie = req.body;

      const movieWithId = await this.moviesRepository.addMovie(movie);

      res.status(201).json({ movie: movieWithId });
    } catch (error) {
      const customError = new CustomError("Couldn't add movie", 400);

      next(customError);
    }
  };
}

export default MovieController;
