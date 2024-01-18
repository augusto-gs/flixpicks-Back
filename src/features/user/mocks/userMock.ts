import { type UserWithoutId, type UserWithoutIdAndName } from "../types";

export const userMock: UserWithoutId = {
  username: "test",
  password: "test1234",
  name: "test",
};

export const userLoginDataMock: UserWithoutIdAndName = {
  username: userMock.username,
  password: userMock.password,
};

export const loginUserMockWithId = {
  _id: "1123124314124124",
  username: "test",
  name: "test",
};
