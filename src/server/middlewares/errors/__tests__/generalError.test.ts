import { type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import generalError from "../generalError";
import { type NextFunction } from "connect";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError controler", () => {
  const req = {};
  const res: Pick<Response, "json" | "status"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next = jest.fn();

  describe("When it receives a response and an error with a status code", () => {
    const error = new CustomError("Endpoint not found", 404);

    test("Then it should call the status method of the response with a 404", () => {
      const expectedStatusCode = 404;

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method of the response with a 'Endpoint not found' message", () => {
      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint not found" });
    });
  });

  describe("When it receives an error without a status code and a response", () => {
    test("Then it should call the status method of the response with a 500", () => {
      const expectedError = new Error("Error without a status code");
      const expectedStatusCode = 500;

      generalError(
        expectedError as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method of the response with a 'General Error'", () => {
      const expectedError = { statusCode: 404, message: "General error" };

      generalError(
        expectedError as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectedError.message });
    });
  });
});
