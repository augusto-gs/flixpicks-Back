import request from "supertest";
import app from "../../../../server/app";
import { userMock } from "../../mocks/userMock";

describe("Given a POST method to a /user/register endpoint", () => {
  const path = "/user/register";

  describe("When it receives a request with a username test and a password test", () => {
    test("Then it should respond with a 400 and the username generated", async () => {
      const okStatusCode = 201;

      const response = await request(app)
        .post(path)
        .send(userMock)
        .expect(okStatusCode);

      const responseBody = response.body as { user: string };

      expect(responseBody).toHaveProperty("user", userMock.username);
    });
  });

  describe("When it receives a request with an already created username", () => {
    test("Then it should respond with a 'Error creating user' message", async () => {
      const expectedErrorMessage = "Error creating user";

      const response = await request(app).post(path).send(userMock).expect(401);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toContain(expectedErrorMessage);
    });
  });
});
