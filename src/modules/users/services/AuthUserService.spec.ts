import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import AuthUserService from './AuthUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashRepository: FakeHashProvider;
let createUser: CreateUserService;
let authUser: AuthUserService;

describe('Auth User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashRepository = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashRepository);
    authUser = new AuthUserService(fakeUsersRepository, fakeHashRepository);
  });

  it('should be able to auth a user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should throw error with inexistent email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authUser.execute({
        email: 'sergio@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw error when auth wrong email/password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authUser.execute({
        email: 'johndoe@example.com',
        password: 'senhazinha',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
