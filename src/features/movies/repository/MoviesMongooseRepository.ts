import Movie from "../model/Movies.js";
import { type MovieStructure, type MovieRepositoryStructure } from "../types";

class MovieMongooseRepository implements MovieRepositoryStructure {
  async getMovies(): Promise<MovieStructure[]> {
    try {
      const movies = await Movie.find();

      return movies;
    } catch {
      throw new Error("Movies have not been found");
    }
  }
}

export default MovieMongooseRepository;
