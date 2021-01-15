import {inject, injectable} from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import UserRepositoryInterface from '../repositories/UsersRepositoryInterface'
import IMailProviders from '@shared/container/providers/mailProvider/models/MailProviderInterface'
import IUserTokensRepository from '../repositories/UserTokensRepositoryInterface'

interface Request{
  email: string,
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private userRepository: UserRepositoryInterface,

    @inject('MailProvider')
    private mailProvider: IMailProviders,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({email}:Request):Promise<void>{

    const checkUserExists = await this.userRepository.findByEmail(email)

    if(!checkUserExists){
      throw new AppError('User does not exist')
    }

    await this.userTokensRepository.generate(checkUserExists.id)

    this.mailProvider.sendEmail(email, 'senhinha')
  }
}

export default SendForgotPasswordEmailService