import {inject, injectable} from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import UserRepositoryInterface from '../repositories/UsersRepositoryInterface'
import HashProvider from '../providers/hashProvider/models/HashProviderInterface'


interface Request{
  name: string,
  email: string,
  password: string
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private userRepository: UserRepositoryInterface,

    @inject('HashProvider')
    private hashProvider: HashProvider
  ) {}

  public async execute({name, email, password}:Request):Promise<User>{

    const checkUserExists = await this.userRepository.findByEmail(email)

    if(checkUserExists){
      throw new AppError('Email address already used')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    })
    return user
  }
}

export default CreateUserService