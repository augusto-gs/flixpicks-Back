import { Router } from "express";
import UserMongooseRepository from "../repository/UserRepository.js";
import UserController from "../controller/UserController.js";
import { loginValidation, registerValidation } from "../schema/userSchema.js";

export const userRouter = Router();

const userRepository = new UserMongooseRepository();
const userController = new UserController(userRepository);

userRouter.post("/register", registerValidation, userController.registerUser);
userRouter.post("/login", loginValidation, userController.loginUser);
