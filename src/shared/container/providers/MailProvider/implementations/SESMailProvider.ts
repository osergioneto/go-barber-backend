import IMailProvider from '../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from '../dtos/ISendMailDTO';
import mailConfig from '@config/mail';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });
  }

  public async sendMail({ to, subject, from, template }: ISendMailDTO) {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: 'Recuperação de senha',
      html: await this.mailTemplateProvider.parse(template),
    });
    console.log('Funcionou');
  }
}
