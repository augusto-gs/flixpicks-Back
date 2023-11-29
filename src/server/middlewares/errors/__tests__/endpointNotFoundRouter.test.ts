import "../../../../server/index";
import request from "supertest";
import app from "../../../app";

describe("Given a GET method for an /incorrect endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 astatus code and a 'Endpoint not found' message", async () => {
      const expectedErrorMessage = "Endpoint not found";
      const expectedPath = "/incorrect";
      const expectedStatusCode = 404;

      const response = await request(app)
        .get(expectedPath)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
