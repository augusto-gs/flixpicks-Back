import { type NextFunction, type Response } from "express";
import {
  type UserMongooseRepositoryStructure,
  type UserRequest,
} from "../types";
import CustomError from "../../../server/CustomError/CustomError.js";

class UserController {
  constructor(public userRepository: UserMongooseRepositoryStructure) {}

  registerUser = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { username, password } = req.body;
    try {
      const newUser = await this.userRepository.registerUser(
        username,
        password,
      );

      res.status(201).json({ user: newUser });
    } catch (error) {
      const customError = new CustomError(
        "Couldn't create user",
        401,
        (error as Error).message,
      );

      next(customError);
    }
  };
}

export default UserController;
