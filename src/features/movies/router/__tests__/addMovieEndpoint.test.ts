import request from "supertest";
import app from "../../../../server/app";
import "../../../../server/index";
import movieMock from "../../mocks/movieMock";
import { type MovieStructure } from "../../types";
import CustomError from "../../../../server/CustomError/CustomError";

describe("Given a POST method to a /movies/create endpoint", () => {
  const path = "/movies/create";

  describe("When it receives a request with a movie Arrival", () => {
    test("Then it should respond with a 201 and a movie Arrival with ID", async () => {
      const expectedStatusCode = 201;

      const response = await request(app)
        .post(path)
        .send(movieMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { movie: MovieStructure };

      expect(responseBody.movie).toHaveProperty("name", "La La Land");
    });
  });

  describe("When it receives a request without a body", () => {
    test("Then it should respond with a 400 and a 'Couldn't add movie error' message", async () => {
      const expectedStatus = 400;
      const expectedError = {
        error: "Couldn't add movie",
      };

      const response = await request(app).post(path).expect(expectedStatus);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
