import { type NextFunction, type Response } from "express";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import {
  type UserRequestWithoutName,
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
    const { username, password, name } = req.body;
    try {
      const newUser = await this.userRepository.registerUser(
        username,
        password,
        name,
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

  loginUser = async (
    req: UserRequestWithoutName,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { username, password } = req.body;

      const { _id, name } = await this.userRepository.loginUser(
        username,
        password,
      );

      const userData: JwtPayload = { sub: _id, name };
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!, {
        expiresIn: "30d",
      });

      res.status(200).json({ token });
    } catch (error) {
      const userError = new CustomError("Wrong credentials", 401);

      next(userError);
    }
  };
}

export default UserController;
