import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), ...data });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const foundIndex = this.users.findIndex(
      foundUser => foundUser.id === user.id,
    );

    this.users[foundIndex] = user;

    return user;
  }
}

export default UsersRepository;
