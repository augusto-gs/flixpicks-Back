import request from "supertest";
import app from "../../../../server/app";
import { movieMock } from "../../mocks/movieMock";
import { type MovieStructure } from "../../types";
import { server } from "../../../../setupTests";

describe("Given a POST method to a /movies/create endpoint", () => {
  const path = "/movies/create";

  describe("When it receives a request with a movie Arrival", () => {
    test("Then it should respond with a 201 and a movie Arrival with ID", async () => {
      const expectedStatusCode = 201;
      const expectedMovieName = "La La Land";

      const response = await request(app)
        .post(path)
        .send(movieMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { movie: MovieStructure };

      expect(responseBody.movie).toHaveProperty("name", expectedMovieName);
    });
  });

  describe("When it receices a request with a movie Arrival and the data base fails", () => {
    test("Then it should respond with an error", async () => {
      await server.stop();

      const expectedStatusCode = 400;
      const expectedError = {
        error: "Couldn't add movie",
      };

      const response = await request(app)
        .post(path)
        .send(movieMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { movie: MovieStructure };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });

  describe("When it receives a request with a Movie with a genre as string", () => {
    test("Then it should respond with a 400 and a 'genre must be an array' message", async () => {
      const expectedStatus = 400;
      const expectedError = {
        error: "genre must be a string",
      };

      const newMovie = { ...movieMock, genre: 3 };

      const response = await request(app)
        .post(path)
        .send(newMovie)
        .expect(expectedStatus);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });

  describe("When it receives a request with a Movie arrival with an isSeen property as string and without a name", () => {
    test("Then it should respond with a 400 and a 'name is required, isSeen must be a boolean' error message", async () => {
      const requestBody = { ...movieMock, isSeen: "false", name: undefined };
      const expectedStatusCode = 400;
      const expectedError = {
        error: "name is required, isSeen must be a boolean",
      };

      const response = await request(app)
        .post(path)
        .send(requestBody)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
