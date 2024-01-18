import { type Response, type Request, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { loginUserMockWithId, userLoginDataMock } from "../../mocks/userMock";
import type UserMongooseRepository from "../../repository/UserRepository";
import {
  type UserRequestWithoutName,
  type UserMongooseRepositoryStructure,
} from "../../types";
import UserController from "../UserController";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a UserController class with a loginUser method", () => {
  const req: Pick<Request, "body"> = {
    body: userLoginDataMock,
  };

  const res: Pick<Response, "json" | "status"> = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a 'test' username and a 'test1234' password for a matching user", () => {
    const expectedStatusCode = 200;

    const userRepository: Partial<UserMongooseRepositoryStructure> = {
      loginUser: jest.fn().mockResolvedValue(loginUserMockWithId),
    };

    const userController = new UserController(
      userRepository as UserMongooseRepository,
    );

    test("Then it should call the response method of status with a 201", async () => {
      await userController.loginUser(
        req as UserRequestWithoutName,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response method json with a token 'AHRTPIUHQR3PTIUY53PNTY'", async () => {
      const token = "AHRTPIUHQR3PTIUY53PNTY";
      jwt.sign = jest.fn().mockReturnValue(token);

      await userController.loginUser(
        req as UserRequestWithoutName,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with incorrect credentials", () => {
    test("Then it should call the received next function with a 'Wrong credentials' error message", async () => {
      const credentialsError: Partial<CustomError> = {
        statusCode: 401,
        message: "Wrong credentials",
      };

      const userRepository: Partial<UserMongooseRepositoryStructure> = {
        loginUser: jest.fn().mockRejectedValue("error"),
      };

      const userController = new UserController(
        userRepository as UserMongooseRepository,
      );

      await userController.loginUser(
        req as UserRequestWithoutName,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining(credentialsError),
      );
    });
  });
});
