import { Joi, validate } from "express-validation";
import { type UserWithoutIdAndName, type UserWithoutId } from "../types";

const passData = {
  password: Joi.string().min(8),
  username: Joi.string().required(),
};

const registerSchema = {
  body: Joi.object<UserWithoutId>({
    name: Joi.string().required(),
    password: passData.password,
    username: passData.username,
  }),
};

const loginSchema = {
  body: Joi.object<UserWithoutIdAndName>({
    username: passData.password,
    password: passData.username,
  }),
};

export const registerValidation = validate(
  registerSchema,
  {},
  { abortEarly: false },
);

export const loginValidation = validate(loginSchema, {}, { abortEarly: false });
