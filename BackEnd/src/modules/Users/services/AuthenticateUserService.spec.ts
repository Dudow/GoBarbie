import 'reflect-metadata'

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/hashProvider/fakes/fakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
  it('should be able to auth a new user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    const response = await authUser.execute({
      email: 'aaa@aaa.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)

  })

  it('should not be able to auth a non user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    )
    
    expect(
      authUser.execute({
        email: 'aaa@aaa.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to auth with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    expect(
      authUser.execute({
        email: 'aaa@aaa.com',
        password: '1234567'
      })
    ).rejects.toBeInstanceOf(AppError)

  })
})