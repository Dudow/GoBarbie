import 'reflect-metadata'
import ResetPasswordService from './ResetPasswordService'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '../providers/hashProvider/fakes/fakeHashProvider'

import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeHashProvider: FakeHashProvider
let resetPasswordService: ResetPasswordService

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository
    fakeHashProvider = new FakeHashProvider()
    
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository, 
      fakeUserTokensRepository,
      fakeHashProvider
    )
  })

  it('should be able to reset password', async () => {

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPasswordService.execute({
      password: '123123',
      token
    })

    const updatedUser = await fakeUserRepository.findById(user.id)

    expect(updatedUser?.password).toBe('123123')
    expect(generateHash).toHaveBeenCalledWith('123123')

  })

  it('should not be able to reset password after 2 hours', async () => {

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    await resetPasswordService.execute({
      password: '123123',
      token
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token
      })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to reset password with a non token', async () => {

    await expect(
      resetPasswordService.execute({
        token: 'blablabla',
        password: 'grigri'
      })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to reset password with a non user', async () => {

    const {token} = await fakeUserTokensRepository.generate('blablabla')

    await expect(
      resetPasswordService.execute({
        token,
        password: 'grigri'
      })
    ).rejects.toBeInstanceOf(AppError)

  })
})