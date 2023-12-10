import { type NextFunction, type Response } from "express";
import { type MovieRequestWithId } from "../../types";
import { moviesMock } from "../../mocks/moviesMock";
import MovieController from "../MovieController";
import type MovieMongooseRepository from "../../repository/MoviesMongooseRepository";
import type CustomError from "../../../../server/CustomError/CustomError";
import { modifiedMovieMock } from "../../mocks/movieMock";

beforeEach(() => jest.clearAllMocks());

describe("Given a MovieController class with a modifyMovie method", () => {
  const res: Pick<Response, "status" | "json"> = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };

  const req: Pick<MovieRequestWithId, "body" | "params"> = {
    body: moviesMock[0],
    params: { movieId: "65637a12d4b93a3787b660f6" },
  };

  const next: NextFunction = jest.fn();
  describe("When it receives a request with a movieId and a movie and a response", () => {
    const movieRepository: Pick<MovieMongooseRepository, "modifyMovie"> = {
      modifyMovie: jest.fn().mockResolvedValue(modifiedMovieMock),
    };

    test("Then it should call response method status with a 200", async () => {
      const expectedStatusCode = 200;

      const movieController = new MovieController(
        movieRepository as MovieMongooseRepository,
      );

      await movieController.modifyMovie(
        req as MovieRequestWithId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response method json with a La La Land movie modified", async () => {
      const movieController = new MovieController(
        movieRepository as MovieMongooseRepository,
      );

      await movieController.modifyMovie(
        req as MovieRequestWithId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ movie: modifiedMovieMock });
    });
  });

  describe("When the controller catches an error thrown from the repository and a next function", () => {
    test("Then it should call its next function with a 'Couldn't modify movie'error message and a status code 400", async () => {
      const expectedError: Partial<CustomError> = {
        message: "Couldn't modify movie",
        statusCode: 400,
      };

      const movieRepository: Pick<MovieMongooseRepository, "modifyMovie"> = {
        modifyMovie: jest.fn().mockRejectedValue(null),
      };

      const movieController = new MovieController(
        movieRepository as MovieMongooseRepository,
      );

      await movieController.modifyMovie(
        req as MovieRequestWithId,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
