import 'reflect-metadata'
import SendForgotPasswordEmail from './SendForgotPasswordEmailService'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeEmailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeEmailProvider: FakeEmailProvider
let fakeUserTokensRepository: FakeUserTokensRepository
let sendForgotPasswordEmail: SendForgotPasswordEmail

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeEmailProvider = new FakeEmailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository
    
    sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUserRepository, 
      fakeEmailProvider,
      fakeUserTokensRepository
    )
  })

  it('should be able to send an email to recover the password', async () => {
    
    const sentEmail = jest.spyOn(fakeEmailProvider, 'sendEmail')

    await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    await sendForgotPasswordEmail.execute({
      email: 'aaa@aaa.com',
    })

    expect(sentEmail).toHaveBeenCalled()

  })

  it('should not be able to send an email to recover the password of a non user', async () => {

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'aaa@aaa.com',
      })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should create a token to recover password', async () => {

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    await sendForgotPasswordEmail.execute({
      email: 'aaa@aaa.com',
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)

  })
})