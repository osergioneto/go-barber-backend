import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthUserService from '@modules/users/services/AuthUserService';
import { classToClass } from 'class-transformer';

export default class AuthController {
  public async auth(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthUserService);

    const { user, token } = await authUserService.execute({ email, password });

    return response.status(200).json({ auth: classToClass(user), token });
  }
}
