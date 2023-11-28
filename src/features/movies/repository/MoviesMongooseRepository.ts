import Movie from "../model/Movies.js";
import { type MovieStructure, type MovieRepositoryStructure } from "../types";

class MovieMongooseRepository implements MovieRepositoryStructure {
  async getMovies(): Promise<MovieStructure[]> {
    const movies = await Movie.find().limit(10);

    return movies;
  }
}

export default MovieMongooseRepository;
