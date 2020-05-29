import { Router } from "express";
import AuthUserService from "../services/AuthUserService";

const authRouter = Router();

authRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;
    const authUserService = new AuthUserService();

    const autheticatedUser = await authUserService.execute({ email, password  });

    return response.status(200).json(autheticatedUser);
  } catch (error) {
    return response.status(401).json({ msg: error.message });
  }
});

export default authRouter;