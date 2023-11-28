import { type Request, type Response } from "express";
import type MovieMongooseRepository from "../repository/MoviesMongooseRepository";

class MovieController {
  constructor(public moviesRepository: MovieMongooseRepository) {}

  getMovies = async (_req: Request, res: Response): Promise<void> => {
    const movies = await this.moviesRepository.getMovies();

    res.status(200).json({ movies });
  };
}

export default MovieController;
