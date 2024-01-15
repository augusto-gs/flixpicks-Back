import { Schema, model } from "mongoose";
import { type UserStructure } from "../types";

const userSchema = new Schema<UserStructure>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model("User", userSchema, "users");

export default User;
