interface Request {
  user_id: string;
  avatarFilename: string;
}

import User from "../models/User";
import { getRepository } from "typeorm";
import fs from "fs";
import path from "path";
import uploadConfig from "../config/upload";

export default class UploadAvatarService {
  public async execute({ user_id, avatarFilename }: Request) {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if(!user) {
      throw new Error("Only authenticated users can change avatar.");
    }

    if(user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}