import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UploadAvatarService from '@modules/users/services/UploadAvatarService';
import { container } from 'tsyringe';
import UsersController from "../controllers/UsersController";

const upload = multer(uploadConfig);
const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersController.updateAvatar
);

export default usersRouter;
