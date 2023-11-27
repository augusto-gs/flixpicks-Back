import { type Request, type Response } from "express";

class PingController {
  getPong(_req: Request, res: Response): void {
    res.status(200).json({ message: "🏓" });
  }
}

export default PingController;
