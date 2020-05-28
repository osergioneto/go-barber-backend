interface Request {
  name: string;
  email: string;
  password: string;
}
import User from "../models/User";
import { getRepository } from "typeorm";

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email }
    });

    if (checkUserExists) {
      throw new Error("Email address already used");
    }

    const createdUser = await userRepository.save({
      name,
      email,
      password
    });

    return createdUser;
  }
}