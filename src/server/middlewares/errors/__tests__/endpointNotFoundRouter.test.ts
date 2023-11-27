import "../../../../server/index";
import request from "supertest";
import app from "../../../app";

describe("Given a GET/incorrect endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 and a 'Endpoint not found' message", async () => {
      const expectedErrorMessage = "Endpoint not found";

      const response = await request(app).get("/incorrect").expect(404);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
