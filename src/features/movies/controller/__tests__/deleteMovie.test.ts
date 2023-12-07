import { type NextFunction, type Response } from "express";
import { type MovieRequestById } from "../../types";
import MovieController from "../MovieController";
import type MovieMongooseRepository from "../../repository/MoviesMongooseRepository";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a MovieController with a deleteMovie method", () => {
  const req: Pick<MovieRequestById, "params"> = {
    params: { movieId: "1234" },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a correct movie id and response", () => {
    const moviesRepository: Pick<MovieMongooseRepository, "deleteMovie"> = {
      deleteMovie: jest.fn(),
    };

    test("Then it should call the response's status method with a 200", async () => {
      const expectedStatusCode = 200;

      const moviesController = new MovieController(
        moviesRepository as MovieMongooseRepository,
      );

      await moviesController.deleteMovie(
        req as MovieRequestById,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's metod status json with an {}", async () => {
      const moviesController = new MovieController(
        moviesRepository as MovieMongooseRepository,
      );

      await moviesController.deleteMovie(
        req as MovieRequestById,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe("When it receives a request with an incorrect movie id and response", () => {
    test("Then it should call its next function with a custom error", async () => {
      const moviesRepository: Pick<MovieMongooseRepository, "deleteMovie"> = {
        deleteMovie: jest.fn().mockRejectedValue(null),
      };

      const movieController = new MovieController(
        moviesRepository as MovieMongooseRepository,
      );

      await movieController.deleteMovie(
        req as MovieRequestById,
        res as Response,
        next,
      );

      const expectedError: Partial<CustomError> = {
        message: "Couldn't delete movie",
        statusCode: 400,
      };

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
