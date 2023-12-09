import { type NextFunction, type Response } from "express";
import { type MovieRequestWithoutId } from "../../types";
import MovieController from "../MovieController";
import type MovieMongooseRepository from "../../repository/MoviesMongooseRepository";
import { movieMock } from "../../mocks/movieMock";
import type CustomError from "../../../../server/CustomError/CustomError";

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

    const movieRepository: Pick<MovieMongooseRepository, "addMovie"> = {
      addMovie: jest.fn().mockResolvedValue({ movieMock }),
    };

    const next: NextFunction = jest.fn();

    test("Then it should call the status method of the response with a 201 status code", async () => {
      const expectedStatusCode = 201;
      const movieController = new MovieController(
        movieRepository as MovieMongooseRepository,
      );

      await movieController.addMovie(
        req as MovieRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method of the response with a La La Land movie", async () => {
      const movieController = new MovieController(
        movieRepository as MovieMongooseRepository,
      );

      await movieController.addMovie(
        req as MovieRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ movie: { movieMock } });
    });

    test("Then it should call the next function with an error status 400 and a 'Couldn't add movie' error message", async () => {
      const movieRepository: Pick<MovieMongooseRepository, "addMovie"> = {
        addMovie: jest.fn().mockRejectedValue(null),
      };

      const expectedError: Partial<CustomError> = {
        message: "Couldn't add movie",
        statusCode: 400,
      };

      const movieController = new MovieController(
        movieRepository as MovieMongooseRepository,
      );

      await movieController.addMovie(
        req as MovieRequestWithoutId,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
