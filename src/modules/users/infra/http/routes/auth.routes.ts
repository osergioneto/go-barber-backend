import { Router } from 'express';
import AuthUserService from '@modules/users/services/AuthUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUserService = container.resolve(AuthUserService);

  const autheticatedUser = await authUserService.execute({ email, password });

  return response.status(200).json(autheticatedUser);
});

export default authRouter;
