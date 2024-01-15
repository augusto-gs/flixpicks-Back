import { type Request } from "express";

export interface UserMongooseRepositoryStructure {
  registerUser: (username: string, password: string) => string;
}

export interface UserStructure {
  username: string;
  password: string;
}

export type UserRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserStructure
>;
