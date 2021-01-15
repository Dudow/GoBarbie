import {inject, injectable} from 'tsyringe'
import path from 'path'

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

    const user = await this.userRepository.findByEmail(email)

    if(!user){
      throw new AppError('User does not exist')
    }

    const {token} =  await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views' ,'forgot_password.hbs')

    await this.mailProvider.sendEmail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: 'Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService