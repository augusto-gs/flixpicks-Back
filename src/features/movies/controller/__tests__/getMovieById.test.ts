import type { Response } from "express";
import { type MovieRequestById } from "../../types";
import { type NextFunction } from "express";
import MovieController from "../MovieController";
import type MovieMongooseRepository from "../../repository/MoviesMongooseRepository";
import movieMock from "../../mocks/movieMock";
import type CustomError from "../../../../server/CustomError/CustomError";

describe("Given a MovieController with a getMovieById", () => {
  const req: Pick<MovieRequestById, "params"> = {
    params: { movieId: "1234" },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When the method receives a request with a movie id and a response", () => {
    const expectedStatusCode = 200;

    const movieRepository: Pick<MovieMongooseRepository, "getMovieById"> = {
      getMovieById: jest.fn().mockResolvedValue(movieMock),
    };

    test("Then it should call its response status method with a 200 status code", async () => {
      const moviesController = new MovieController(
        movieRepository as MovieMongooseRepository,
      );

      await moviesController.getMovieById(
        req as MovieRequestById,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a La La Land movie", async () => {
      const moviesController = new MovieController(
        movieRepository as MovieMongooseRepository,
      );

      await moviesController.getMovieById(
        req as MovieRequestById,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(movieMock);
    });
  });

  describe("When the method receives a request with a movie id and a response and the repository throws an error", () => {
    test("Then it should call its next function with a 400 status code and a 'Couldn't find movie' message", async () => {
      const expectedError: Partial<CustomError> = {
        message: "Couldn't find movie",
        statusCode: 400,
      };

      const movieRepository: Pick<MovieMongooseRepository, "getMovieById"> = {
        getMovieById: jest.fn().mockRejectedValue(null),
      };

      const moviesController = new MovieController(
        movieRepository as MovieMongooseRepository,
      );

      await moviesController.getMovieById(
        req as MovieRequestById,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
