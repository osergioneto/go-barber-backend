import User from "../models/User";
import { compare } from "bcryptjs";
import { getRepository, Unique } from "typeorm";
import { sign } from "jsonwebtoken";
const { JWT_SECRET } = require("../../env");

interface Request {
  email: string;
  password: string;
}

export default class AuthUserService {
  public async execute({ email, password }: Request): Promise<string> {
    const userRepository =  getRepository(User);

    const user = await userRepository.findOne({ email });

    if(!user) {
      throw new Error("Incorrect email/password");
    }

    const validPassword = await compare(password, user.password);

    if(!validPassword) {
      throw new Error("Incorrect email/password");
    }

    const token = sign({}, JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;
  }
}