import IMailTemplateProvider from '../models/iMailTemplateProvider'
import IMailTemplateDTO from '../dto/IParseTemplateDTO'

export default class FakeMailTemplateProvider implements IMailTemplateProvider{
  public async parse({file, variables}:IMailTemplateDTO): Promise<string>{
    return 'Mail content'
  }
}
