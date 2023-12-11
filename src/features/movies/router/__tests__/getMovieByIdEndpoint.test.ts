import request from "supertest";
import app from "../../../../server/app";
import { type MovieStructure } from "../../types";
import Movie from "../../model/Movies";
import { moviesMock } from "../../mocks/moviesMock";

describe("Given a GET method to a /:movieId endpoint", () => {
  const expectedWrongStatus = 400;
  const expectedError = { error: "Couldn't find movie" };

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

      const response = await request(app)
        .get(wrongPath)
        .expect(expectedWrongStatus);

      const responseBody = response.body as { error: MovieStructure };

      expect(responseBody).toStrictEqual(expectedError);

      await Movie.findByIdAndDelete("65637a12d4b93a3787b660fd");
    });
  });

  describe("When it receives a request and the vlaue returned by the database is null", () => {
    test("Then it should respond with a 400 and an error", async () => {
      const path = "/movies/65637a12d4b93a3787b660fd";

      const response = await request(app).get(path).expect(expectedWrongStatus);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
