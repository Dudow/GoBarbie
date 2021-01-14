export default interface HashProviderInterface{
  generateHash(payload: string): Promise<string>
  compareHash(payload:string, hashed: string): Promise<boolean >
}