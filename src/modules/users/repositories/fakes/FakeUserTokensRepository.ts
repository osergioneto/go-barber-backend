import UserToken from '../../infra/typeorm/entities/UserToken';
import IUserTokensRepositories from '@modules/users/repositories/IUserTokensRepositories';
import { uuid } from 'uuidv4';

class FakeUserTokensRepository implements IUserTokensRepositories {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
