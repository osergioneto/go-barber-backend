import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import AuthUserService from './AuthUserService';
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";

describe('Auth User', () => {
  it('should be able to auth a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashRepository = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashRepository);
    const authUser = new AuthUserService(fakeUsersRepository, fakeHashRepository);

    const user = await createUser.execute({
      name: "John Doe",
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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashRepository = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashRepository);
    const authUser = new AuthUserService(fakeUsersRepository, fakeHashRepository);

    await createUser.execute({
      name: "John Doe",
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(authUser.execute({
      email: 'sergio@gmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should throw error when auth wrong email/password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashRepository = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashRepository);
    const authUser = new AuthUserService(fakeUsersRepository, fakeHashRepository);

    await createUser.execute({
      name: "John Doe",
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(authUser.execute({
      email: 'johndoe@example.com',
      password: 'senhazinha',
    })).rejects.toBeInstanceOf(AppError);
  });

});