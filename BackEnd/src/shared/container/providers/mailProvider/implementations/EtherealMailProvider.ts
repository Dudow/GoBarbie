import nodemailer, {Transporter} from 'nodemailer'
import { inject, injectable} from 'tsyringe'

import MailProvider from '../models/MailProviderInterface'
import ISendEmailDTO from '../dto/ISendMailDTO'

import IMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/models/iMailTemplateProvider'

@injectable()
export default class EtherialFakeMailProvider implements MailProvider{

  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ){
    nodemailer.createTestAccount().then(account =>{
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })
  
      this.client = transporter
    })
    
  }

  public async sendEmail({to, subject, from, templateData }:ISendEmailDTO): Promise<void>{
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Secreto 🤫',
        address: from?.email ||  'edu30.nm@gmail.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

  }
}