import { type Request } from "express";

export interface MovieStructure extends MovieWithoutId {
  _id: string;
}

export interface MovieWithoutId {
  name: string;
  director: string;
  writer: string;
  stars: string;
  releaseDate: string;
  genre: string;
  description: string;
  imageUrl: string;
  score: string;
  isSeen: boolean;
}

export interface MovieRepositoryStructure {
  getMovies: () => Promise<MovieStructure[]>;
  deleteMovie: (id: string) => Promise<void>;
  addMovie: (movie: MovieWithoutId) => Promise<MovieStructure>;
  getMovieById: (id: string) => Promise<MovieStructure>;
}

export type MovieRequestWithoutId = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  MovieWithoutId
>;

export type MovieRequestById = Request<{ movieId: string }>;
