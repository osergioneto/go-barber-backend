import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthUserService from "@modules/users/services/AuthUserService";

export default class AuthController {
  public async auth(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthUserService);
  
    const autheticatedUser = await authUserService.execute({ email, password });
  
    return response.status(200).json(autheticatedUser);
  }
}