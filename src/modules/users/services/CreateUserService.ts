interface Request {
  name: string;
  email: string;
  password: string;
}
import User from '@modules/users/infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashPassword = await hash(password, 8);

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    delete createdUser.password;

    return createdUser;
  }
}
