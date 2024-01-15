import { type NextFunction, type Response } from "express";
import {
  type UserMongooseRepositoryStructure,
  type UserRequest,
} from "../types";
import CustomError from "../../../server/CustomError/CustomError";

class UserController {
  constructor(public userRepository: UserMongooseRepositoryStructure) {}

  registerUser(req: UserRequest, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    try {
      const newUser = this.userRepository.registerUser(username, password);
      res.status(201).json({ user: newUser });
    } catch (error) {
      const customError = new CustomError(
        "Couldn't create user",
        404,
        (error as Error).message,
      );
      next(customError);
    }
  }
}

export default UserController;
