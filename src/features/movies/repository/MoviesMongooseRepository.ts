import Movie from "../model/Movies";
import { type MovieStructure, type MovieRepositoryStructure } from "../types";

class MovieMongooseRepository implements MovieRepositoryStructure {
  async getMovies(): Promise<MovieStructure[]> {
    const movies = await Movie.find();

    return movies;
  }
}

export default MovieMongooseRepository;
