import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import User from '../../typeorm/entities/User';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.status(200).json(classToClass(user));
  }

  public async update(request: Request, response: Response) {
    const { name, email, password, old_password, user_id } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id: request.user.id,
      name,
      email,
      old_password,
      password,
    });

    return response.status(200).json(classToClass(user));
  }
}
