import { type Request } from "express";

export interface UserMongooseRepositoryStructure {
  registerUser: (
    username: string,
    password: string,
    name: string,
  ) => Promise<string>;
}

export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  password: string;
}

export type UserWithoutPassword = Omit<UserStructure, "password">;

export type UserRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserStructure
>;
