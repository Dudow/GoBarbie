import { sign } from 'jsonwebtoken'
import {inject, injectable} from 'tsyringe'

import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import UserRepositoryInterface from '../repositories/UsersRepositoryInterface'
import HashProvider from '../providers/hashProvider/models/HashProviderInterface'

import User from '../infra/typeorm/entities/User'

interface Request{
  email: string,
  password: string
}

interface Response{
  user: User,
  token: String
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepositoryInterface,

    @inject('HashProvider')
    private hashProvider: HashProvider
  ) {}

  public async execute({ email, password}:Request):Promise<Response> {

    const user = await this.usersRepository.findByEmail(email)

    if(!user){
      throw new AppError('Incorrect email or password', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password)

    if(!passwordMatched){
      throw new AppError('Incorrect email or password', 401)
    }

    const token = sign({}, authConfig.jwt.secret, { 
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return { 
      user,
      token
    }
  }
}

export default AuthenticateUserService