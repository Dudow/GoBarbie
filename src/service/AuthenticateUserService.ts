import { getRepository } from 'typeorm'
import {compare} from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import authConfig from '../config/auth'

interface Request{
  email: string,
  password: string
}

interface Response{
  user: User,
  token: String
}

class AuthenticateUserService {
  public async execute({ email, password}:Request):Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ 
      where: { 
        email
      }
    })

    if(!user){
      throw new Error('Incorrect email or password')
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched){
      throw new Error('Incorrect email or password')
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