import HashProviderInterface from '../models/HashProviderInterface'

export default class FakeHashProvider implements HashProviderInterface{
  public async generateHash(payload: string): Promise<string>{
    return payload
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean>{
    return payload === hashed
  }

}