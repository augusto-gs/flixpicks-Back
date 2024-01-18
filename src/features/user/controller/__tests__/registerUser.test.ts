import { type Response, type Request, type NextFunction } from "express";
import { userMock } from "../../mocks/userMock";
import {
  type UserRequest,
  type UserMongooseRepositoryStructure,
} from "../../types";
import UserController from "../UserController";
import type CustomError from "../../../../server/CustomError/CustomError";
import type UserMongooseRepository from "../../repository/UserRepository";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a UserController class with a registerUser method", () => {
  const req: Pick<Request, "body"> = {
    body: userMock,
  };

  const res: Pick<Response, "status" | "json"> = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a 'test' username and a 'test1234' password", () => {
    const expectedPath = 201;

    const userRepository: Partial<UserMongooseRepositoryStructure> = {
      registerUser: jest.fn().mockReturnValue(userMock.username),
    };

    test("Then it should call the response method status with a 201", async () => {
      const userController = new UserController(
        userRepository as UserMongooseRepository,
      );

      await userController.registerUser(
        req as UserRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedPath);
    });

    test("Then it should call the response method json with a username test", async () => {
      const userController = new UserController(
        userRepository as UserMongooseRepository,
      );

      await userController.registerUser(
        req as UserRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ user: userMock.username });
    });
  });

  describe("When it receives a request with an already existant username", () => {
    test("Then it should call its next function with a status code 401 and a 'Couldn't create user' message", async () => {
      const userRepository: Partial<UserMongooseRepositoryStructure> = {
        registerUser: jest.fn().mockRejectedValue("Error"),
      };

      const customError: Partial<CustomError> = {
        message: "Couldn't create user",
        statusCode: 401,
      };

      const userController = new UserController(
        userRepository as UserMongooseRepository,
      );

      await userController.registerUser(
        req as UserRequest,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(customError));
    });
  });
});
