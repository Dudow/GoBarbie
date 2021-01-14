import User from '../infra/typeorm/entities/User'
import path from 'path'
import fs from 'fs'
import {inject, injectable} from 'tsyringe'

import UserRepositoryInterface from '../repositories/UsersRepositoryInterface'
import StorageProviderInterface from '@shared/container/providers/storageProvider/models/storageProviderInterface'
import AppError from '@shared/errors/AppError'
import uploadConfig from '@config/upload'

interface Request {
  user_id: string,
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService{

  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepositoryInterface,
    
    @inject('StorageProvider')
    private storageProvider: StorageProviderInterface
    
  ) {}

  public async execute({ user_id, avatarFilename}:Request):Promise<User>{

    const user =  await this.usersRepository.findById(user_id)

    if(!user){{
      throw new AppError('Only authenticated users can change avatar', 401)
    }}

    if(user.avatar){
      await this.storageProvider.deleteFile(user.avatar)
    }


    const fileName = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = fileName

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService