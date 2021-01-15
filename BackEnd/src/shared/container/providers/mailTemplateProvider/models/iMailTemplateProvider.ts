import IParseTemplate from '../dto/IParseTemplateDTO'

export default interface IMailTemplateProvider{
  parse(data: IParseTemplate): Promise<string>
}