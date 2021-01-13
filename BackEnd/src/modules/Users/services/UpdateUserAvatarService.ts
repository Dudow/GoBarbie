import User from '../infra/typeorm/entities/User'
import path from 'path'
import fs from 'fs'
import {inject, injectable} from 'tsyringe'

import UserRepositoryInterface from '../repositories/UsersRepositoryInterface'
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
    private usersRepository: UserRepositoryInterface
  ) {}

  public async execute({ user_id, avatarFilename}:Request):Promise<User>{

    const user =  await this.usersRepository.findById(user_id)

    if(!user){{
      throw new AppError('Only authenticated users can change avatar', 401)
    }}

    if(user.avatar){
      const userAvatarFilePAth = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePAth)

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePAth)
      }
    }

    user.avatar = avatarFilename

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService