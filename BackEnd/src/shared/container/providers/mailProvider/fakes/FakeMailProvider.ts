import MailProvider from '../models/MailProviderInterface'

interface Message{
  to: string,
  body: string
}

export default class FakeMailProvider implements MailProvider{

  private messages: Message[] = []

  public async sendEmail(to: string, body: string): Promise<void>{
    this.messages.push({
      to,
      body
    })
  }
}