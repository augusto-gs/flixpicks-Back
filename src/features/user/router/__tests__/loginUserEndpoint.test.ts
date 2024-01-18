import request from "supertest";
import app from "../../../../server/app";

describe("Given a POST method to a /user/login endpoint", () => {
  const path = "/user/login";

  describe("When it receives a request with valid username 'test-user' and password '4321'", () => {
    test("Then it should respond with a status code 200 and a token", async () => {
      const correctStatusCode = 200;
      const userCredentials = { username: "test-user", password: "4321" };

      const response = await request(app)
        .post(path)
        .send(userCredentials)
        .expect(correctStatusCode);

      const responseBody = response.body as { token: string };

      expect(responseBody).not.toBeUndefined();
    });
  });

  describe("When it receives a request with invalid credentials", () => {
    test("Then it should respond with a status code 400 and a 'Wrong credentials' error message", async () => {
      const wrongUserCredentials = {
        username: "test-user",
        password: "wrongPassword",
      };
      const expectedError = { error: "Wrong credentials" };

      const wrongStatusCode = 401;
      const response = await request(app)
        .post(path)
        .send(wrongUserCredentials)
        .expect(wrongStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });

  describe("When it receives a request without a password", () => {
    test("Then it should respond with a 400 and a 'password is required' message", async () => {
      const expectedWrongStatus = 400;
      const credentialsWithoutPassword = {
        username: "test-user",
      };
      const expectedError = { error: "password is required" };

      const response = await request(app)
        .post(path)
        .send(credentialsWithoutPassword)
        .expect(expectedWrongStatus);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
