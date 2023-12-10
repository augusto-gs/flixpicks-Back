import request from "supertest";
import app from "../../../../server/app";

describe("Given a DELETE method to a /movies:movieId path", () => {
  describe("When it receives a request with a correct movie id", () => {
    test("Then it should respond with a 200 status code and an empty json object in its body", async () => {
      const path = "/movies/65637a12d4b93a3787b660f6";
      const expectedStatusCode = 200;

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a request with an incorrect movie id", () => {
    test("Then it should respond with a 400 status code and a 'Bad request' error message", async () => {
      const expectedStatusCode = 400;
      const incorrectPath = "/movies/1234";
      const expectedErrorMessage = "Couldn't delete movie";

      const response = await request(app)
        .delete(incorrectPath)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
