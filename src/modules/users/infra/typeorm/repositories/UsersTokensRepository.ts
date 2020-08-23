import UserToken from '../entities/UserToken';
import { getRepository, Repository } from 'typeorm';
import IUserTokensRepositories from '@modules/users/repositories/IUserTokensRepositories';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UserTokensRepository implements IUserTokensRepositories {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({
      where: { token },
    });
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
