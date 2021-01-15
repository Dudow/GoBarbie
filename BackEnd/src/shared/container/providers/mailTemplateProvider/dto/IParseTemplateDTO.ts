interface ITemplateVariables{
  [key: string]: string | number
}

export default interface IParseMailDTO{
  file: string,
  variables: ITemplateVariables
}