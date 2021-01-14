export default interface storageProviderInterface{
  saveFile(file:string):Promise<string>
  deleteFile(file:string):Promise<void>
}