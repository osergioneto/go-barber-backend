import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendEmailForgotPasswordService from '@modules/users/services/SendEmailForgotPasswordService';

export default class ForgotPasswordControlelr {
  public async create(request: Request, response: Response) {
    const { email } = request.body;

    const sendEmailForgotPassword = container.resolve(
      SendEmailForgotPasswordService,
    );

    await sendEmailForgotPassword.execute({ email });

    return response.status(204).json();
  }
}
