import handlebars from 'handlebars'
import fs from 'fs'

import IMailTemplateProvider from '../models/iMailTemplateProvider'
import IMailTemplateDTO from '../dto/IParseTemplateDTO'

export default class HandleBarsMailTemplateProvider implements IMailTemplateProvider{
  public async parse({file, variables}:IMailTemplateDTO): Promise<string>{

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}
