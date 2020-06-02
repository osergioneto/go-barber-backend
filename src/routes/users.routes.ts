import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import uploadConfig from "../config/upload";
import multer from "multer";
import UploadAvatarService from "../services/UploadAvatarService";

const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } =  request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });

    return response.status(201).json(user);
  } catch ({ message }) {
    console.log("user: ", message);
    return response.status(400).json({ error: message })
  }
  
});

usersRouter.patch(
  '/avatar', 
  ensureAuthenticated, 
  upload.single("avatar"), 
  async (request, response) => {
    const uploadAvatar = new UploadAvatarService();

    const user = await uploadAvatar.execute({ 
      user_id: request.user.id, 
      avatarFilename: request.file.filename}
    );
      
    return response.status(200).json(user);
});

export default usersRouter;