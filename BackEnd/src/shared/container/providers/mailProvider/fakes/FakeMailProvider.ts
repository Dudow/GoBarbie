import MailProvider from '../models/MailProviderInterface'
import ISendEmailDTO from '../dto/ISendMailDTO'

export default class FakeMailProvider implements MailProvider{

  private messages: ISendEmailDTO[] = []

  public async sendEmail(message: ISendEmailDTO): Promise<void>{
    this.messages.push(message)
  }
}