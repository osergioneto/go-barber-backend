import { Request, Response } from "express";
import CreateUserService from "@modules/users/services/CreateUserService";
import { container } from "tsyringe";
import UploadAvatarService from "@modules/users/services/UploadAvatarService";

export default class UsersController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, password });

    return response.status(201).json(user);
  }

  public async updateAvatar(request: Request, response: Response) {
    const uploadAvatar = container.resolve(UploadAvatarService);

    const user = await uploadAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.status(200).json(user);
  }
}