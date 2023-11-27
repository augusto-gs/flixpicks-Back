import { type Request, type Response } from "express";
import PingController from "./PingController";

describe("Given a PingController", () => {
  describe("When it receives a response", () => {
    const { getPong } = new PingController();
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const req = {};

    test("Then it should call its status method with a 200", () => {
      const expectedStatusCode = 200;

      getPong(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a '🏓' message", () => {
      const expectedMessage = { message: "🏓" };

      getPong(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
