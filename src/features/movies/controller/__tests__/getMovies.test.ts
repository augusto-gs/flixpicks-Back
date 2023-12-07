import { type Request, type Response } from "express";
import { type MovieRepositoryStructure } from "../../types";
import MovieController from "../MovieController";
import { moviesMock } from "../../mocks/moviesMock";

describe("Given a MovieController", () => {
  describe("When it receives a response", () => {
    const moviesRepository: Pick<MovieRepositoryStructure, "getMovies"> = {
      getMovies: jest.fn().mockResolvedValue(moviesMock),
    };
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const movieController = new MovieController(
      moviesRepository as MovieRepositoryStructure,
    );

    test("Then it should call its status method with a 200 status code", async () => {
      const expectedStatusCode = 200;

      await movieController.getMovies(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a movie LaLaLand and Arrival", async () => {
      await movieController.getMovies(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ movies: moviesMock });
    });
  });
});
