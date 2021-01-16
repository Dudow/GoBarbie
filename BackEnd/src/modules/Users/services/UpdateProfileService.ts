import {inject, injectable} from 'tsyringe'

import UserRepositoryInterface from '../repositories/UsersRepositoryInterface'
import HashProvider from '../providers/hashProvider/models/HashProviderInterface'
import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

interface Request {
  user_id: string,
  name: string,
  email: string,
  password?: string,
  old_password?: string
}

@injectable()
class UpdateProfileService{

  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepositoryInterface,
    
    @inject('HashProvider')
    private hashProvider: HashProvider
    
  ) {}

  public async execute({ user_id, name, email, password, old_password }:Request):Promise<User>{
    const user = await this.usersRepository.findById(user_id)

    if(!user){
      throw new AppError('User not found')
    }

    const searchRepeatedUsers = await this.usersRepository.findByEmail(email)

    if(searchRepeatedUsers && searchRepeatedUsers.id !== user_id){
      throw new AppError('Email already in use!')
    }

    user.name = name
    user.email = email

    if(password && !old_password){
      throw new AppError('You need to inform old password to set a new password')
    }

    if(password && old_password){

      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)

      if(!checkOldPassword){
        throw new AppError('Old password does not match ')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    return this.usersRepository.save(user)
  }
}

export default UpdateProfileService