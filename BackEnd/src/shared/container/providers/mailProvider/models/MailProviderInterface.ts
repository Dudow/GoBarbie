export default interface MailProvider{
  sendEmail(to: string, body: string):Promise<void>
}