import app from "../../../../server/app";
import request from "supertest";
import { type MovieStructure } from "../../types";
import { moviesMock } from "../../mocks/moviesMock";
import Movie from "../../model/Movies";

describe("Given a GET/movies path", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and with the movie LaLaLand and Arrival", async () => {
      const expectedStatusCode = 200;

      const response = await request(app)
        .get("/movies")
        .expect(expectedStatusCode);

      await Movie.create(moviesMock[0]);
      await Movie.create(moviesMock[1]);
      await Movie.create(moviesMock[2]);

      const responseBody = response.body as { movies: MovieStructure[] };

      responseBody.movies.forEach((movie, moviePosition) => {
        expect(movie).toHaveProperty("name", moviesMock[moviePosition].name);
      });
    });
  });
});
