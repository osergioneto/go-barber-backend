import IUsersRepository from '../repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepositories';

interface Request {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private usersTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: Request): Promise<void> {}
}
