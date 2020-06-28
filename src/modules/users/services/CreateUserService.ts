interface Request {
  name: string;
  email: string;
  password: string;
}
import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashPassword = await hash(password, 8);

    const createdUser = await userRepository.save({
      name,
      email,
      password: hashPassword,
    });

    delete createdUser.password;

    return createdUser;
  }
}
