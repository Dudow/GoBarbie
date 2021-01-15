import {inject, injectable} from 'tsyringe'
import { isAfter, addHours } from 'date-fns'

import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import UserRepositoryInterface from '../repositories/UsersRepositoryInterface'
import IUserTokensRepository from '../repositories/UserTokensRepositoryInterface'
import IHashProvider from '../providers/hashProvider/models/HashProviderInterface'

interface Request{
  password: string,
  token: string
}

@injectable()
class ResetPasswordService {

  constructor(
    @inject('UsersRepository')
    private userRepository: UserRepositoryInterface,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProviderRepository: IHashProvider
  ) {}

  public async execute({password, token}:Request):Promise<void>{
    const userToken = await this.userTokensRepository.findByToken(token)

    if(!userToken){
      throw new AppError('User token does not exist')
    }

    const user = await this.userRepository.findById(userToken.user_id)

    if(!user){
      throw new AppError('User does not exist')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired')
    }

    user.password = await this.hashProviderRepository.generateHash(password)

    await this.userRepository.save(user)
  }
}

export default ResetPasswordService