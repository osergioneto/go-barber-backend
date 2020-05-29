import { Router } from "express";
import CreateUserService from "../services/CreateUserService";

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } =  req.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });

    return res.status(201).json(user);
  } catch ({ message }) {
    console.log("user: ", message);
    return res.status(400).json({ error: message })
  }
  
});

export default usersRouter;