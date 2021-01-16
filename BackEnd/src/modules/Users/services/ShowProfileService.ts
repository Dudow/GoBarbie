import {inject, injectable} from 'tsyringe'

import UserRepositoryInterface from '../repositories/UsersRepositoryInterface'
import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

interface Request {
  user_id: string,
}

@injectable()
class ShowProfile{

  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepositoryInterface,
  ) {}

  public async execute({ user_id }:Request):Promise<User>{
    const user = await this.usersRepository.findById(user_id)

    if(!user){
      throw new AppError('User not found')
    }

    return user
  }
}

export default ShowProfile