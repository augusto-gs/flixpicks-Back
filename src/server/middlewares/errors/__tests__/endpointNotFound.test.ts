import { type Response, type Request } from "express";
import type CustomError from "../../../CustomError/CustomError";
import endpointNotFound from "../endpointNotFound";
import { type NextFunction } from "connect";

describe("Given an endpointNotFound controller", () => {
  describe("When it receives a next function", () => {
    test("Then it should call it with a 404 status and a 'Endpoint not found' message", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError: Partial<CustomError> = {
        statusCode: 404,
        message: "Endpoint not found",
      };

      endpointNotFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
