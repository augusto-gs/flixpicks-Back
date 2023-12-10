import request from "supertest";
import app from "../../../../server/app";
import { type MovieStructure } from "../../types";
import Movie from "../../model/Movies";
import { modifiedMovieMock, movieMockWithId } from "../../mocks/movieMock";

describe("Given a PATCH method to a /movies/:movieId endpoint", () => {
  describe("When it receives a request with a modified La La Land movie", () => {
    test("Then it should respond with a 200 and a movie La La Land", async () => {
      const expectedChangedName = "Test";
      await Movie.create(movieMockWithId);

      const response = await request(app)
        .patch("/movies/65637a12d4b93a3787b660f6")
        .send(modifiedMovieMock)
        .expect(200);

      const responseBody = response.body as { movie: MovieStructure };

      expect(responseBody.movie).toHaveProperty("name", expectedChangedName);
    });
  });

  describe("When it receives a request with a modified La La Land movie and an incorrect id", () => {
    test("Then it should respond with a 'Couldn't add movie' error message", async () => {
      const expectedWrongStatusCode = 400;
      const expectedError = {
        error: "Couldn't modify movie",
      };

      const response = await request(app)
        .patch("/movies/1234")
        .send(modifiedMovieMock)
        .expect(expectedWrongStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
