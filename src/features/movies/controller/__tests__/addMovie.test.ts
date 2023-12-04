import { type NextFunction, type Response } from "express";
import { type MovieRequestWithoutId } from "../../types";
import MovieController from "../MovieController";
import type MovieMongooseRepository from "../../repository/MoviesMongooseRepository";
import movieMock from "../../mocks/movieMock";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given a MovieController controller with a addMovie method", () => {
  describe("When it receives a request with a movie without an id and a response", () => {
    const req: Pick<MovieRequestWithoutId, "body"> = {
      body: movieMock,
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const movieRepository: MovieMongooseRepository = {
      addMovie: jest.fn().mockResolvedValue({ movieMock }),
      deleteMovie: jest.fn(),
      getMovies: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    test("Then it should call the status method of the response with a 201 status code", async () => {
      const movieController = new MovieController(movieRepository);

      await movieController.addMovie(
        req as MovieRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Then it should call the json method of the response with a La La Land movie", async () => {
      const movieController = new MovieController(movieRepository);

      await movieController.addMovie(
        req as MovieRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ movie: { movieMock } });
    });
  });
});
