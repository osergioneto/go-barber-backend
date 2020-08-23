import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepositories from '@modules/users/repositories/IUserTokensRepositories';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import '@modules/users/providers';
import './providers';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepositories>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepositories>(
  'UserTokensRepository',
  UserTokensRepository,
);
