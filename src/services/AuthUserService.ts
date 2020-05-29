import User from "../models/User";
import { compare } from "bcryptjs";
import { getRepository, Unique } from "typeorm";

interface Request {
  email: string;
  password: string;
}

export default class AuthUserService {
  public async execute({ email, password }: Request): Promise<User> {
    const userRepository =  getRepository(User);

    const user = await userRepository.findOne({ email });

    if(!user) {
      throw new Error("Incorrect email/password");
    }

    const validPassword = await compare(password, user.password);

    if(!validPassword) {
      throw new Error("Incorrect email/password");
    }

    delete user.password;

    return user;
  }
}