import ISendEmailDTO from '../dto/ISendMailDTO'

export default interface MailProvider{
  sendEmail(data: ISendEmailDTO):Promise<void>
}