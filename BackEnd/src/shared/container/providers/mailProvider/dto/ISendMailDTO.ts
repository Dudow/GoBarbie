import IParseEmailDTO from '@shared/container/providers/mailTemplateProvider/dto/IParseTemplateDTO'

interface IMailContact{
  name: string,
  email: string
}

export default interface ISendEmailDTO{
  to: IMailContact,
  from?: IMailContact,
  subject: string,
  templateData: IParseEmailDTO 
}