import { Router } from "express";
import UserMongooseRepository from "../repository/UserRepository.js";
import UserController from "../controller/UserController.js";

export const userRouter = Router();

const userRepository = new UserMongooseRepository();
const userController = new UserController(userRepository);

userRouter.post("/register", userController.registerUser);
