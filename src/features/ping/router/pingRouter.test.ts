import "../../../server/index";
import request from "supertest";
import app from "../../../server/app";

describe("Given a GET method with a '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and a '🏓' message", async () => {
      const expectedStatusCode = 200;
      const path = "/";
      const expectedMessage = "🏓";

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { message: string };

      expect(responseBody).toHaveProperty("message", expectedMessage);
    });
  });
});
