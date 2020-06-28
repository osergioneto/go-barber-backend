import User from '@modules/users/infra/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}

export default class AuthUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ token: string }> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new AppError('Incorrect email/password', 401);
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new AppError('Incorrect email/password', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { token };
  }
}
