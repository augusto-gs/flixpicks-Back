import { type Request } from "express";

export interface UserMongooseRepositoryStructure {
  registerUser: (
    username: string,
    password: string,
    name: string,
  ) => Promise<string>;

  loginUser: (
    username: string,
    userPassword: string,
  ) => Promise<UserWithoutPassword>;
}

export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  password: string;
}

export type UserWithoutIdAndName = Pick<UserStructure, "username" | "password">;

export type UserWithoutId = Omit<UserStructure, "_id">;

export type UserWithoutPassword = Omit<UserStructure, "password">;

export interface UserCredentials {
  username: string;
  password: string;
}

export type UserRequestWithoutName = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export type UserRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserWithoutId
>;
