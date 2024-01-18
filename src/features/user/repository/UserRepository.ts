import User from "../model/User.js";
import bcrypt from "bcrypt";
import {
  type UserWithoutPassword,
  type UserMongooseRepositoryStructure,
} from "../types.js";

class UserMongooseRepository implements UserMongooseRepositoryStructure {
  async registerUser(
    username: string,
    password: string,
    name: string,
  ): Promise<string> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        username,
        password: hashedPassword,
        name,
      });

      return newUser.username;
    } catch (error) {
      throw new Error("Error creating user" + (error as Error).message);
    }
  }

  async loginUser(
    username: string,
    userPassword: string,
  ): Promise<UserWithoutPassword> {
    try {
      const user = await User.findOne({ username });

      if (!(await bcrypt.compare(userPassword, user!.password))) {
        throw new Error("Incorrect credentials");
      }

      const { password, ...userWithoutPassword } = user!.toJSON();

      return userWithoutPassword;
    } catch (error) {
      throw new Error("Error verifying user" + (error as Error).message);
    }
  }
}

export default UserMongooseRepository;
