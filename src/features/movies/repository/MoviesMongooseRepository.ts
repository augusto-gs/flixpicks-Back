import Movie from "../model/Movies.js";
import {
  type MovieStructure,
  type MovieRepositoryStructure,
  type MovieWithoutId,
} from "../types";

class MovieMongooseRepository implements MovieRepositoryStructure {
  async getMovies(): Promise<MovieStructure[]> {
    const movies = await Movie.find().limit(10);

    return movies;
  }

  async deleteMovie(movieId: string): Promise<void> {
    try {
      await Movie.findByIdAndDelete(movieId);
    } catch (error) {
      throw new Error("Error deleting the movie" + (error as Error).message);
    }
  }

  async addMovie(movie: MovieWithoutId): Promise<MovieStructure> {
    try {
      const newMovie = await Movie.create(movie);

      return newMovie;
    } catch (error) {
      throw new Error("Error deleting the movie" + (error as Error).message);
    }
  }

  async getMovieById(id: string): Promise<MovieStructure> {
    try {
      const movie = await Movie.findById(id);

      return movie!;
    } catch (error) {
      throw new Error("Error finding movie" + (error as Error).message);
    }
  }
}

export default MovieMongooseRepository;
