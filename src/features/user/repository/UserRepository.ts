import User from "../model/User.js";
import bcrypt from "bcrypt";

class UserMongooseRepository {
  async registerUser(username: string, password: string): Promise<string> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({ username, password: hashedPassword });

      return newUser.username;
    } catch (error) {
      throw new Error("Error creating user" + (error as Error).message);
    }
  }
}

export default UserMongooseRepository;