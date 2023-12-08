import request from "supertest";
import app from "../../../../server/app";
import { type MovieStructure } from "../../types";
import "../../../../server/index";
import Movie from "../../model/Movies";
import { moviesMock } from "../../mocks/moviesMock";

describe("Given a GET method to a /:movieId endpoint", () => {
  describe("When it receives a request with an id for La La Land", () => {
    test("Then it should respond with a 200 and a movie La La Land", async () => {
      await Movie.create(moviesMock[2]);
      const path = "/movies/65637a12d4b93a3787b660fd";
      const expectedStatusCode = 200;

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { movie: MovieStructure };

      expect(responseBody.movie).toHaveProperty(
        "name",
        "El Secreto de Sus Ojos",
      );
    });
  });

  describe("When it receives a request with an incorrect id", () => {
    test("Then it should respond with a 400 and an error", async () => {
      const wrongPath = "/movies/141241";
      const expectedStatus = 400;
      const expectedError = { error: "Couldn't find movie" };

      const response = await request(app).get(wrongPath).expect(expectedStatus);

      const responseBody = response.body as { error: MovieStructure };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
