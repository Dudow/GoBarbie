import 'reflect-metadata'

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/hashProvider/fakes/fakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let authUser: AuthenticateUserService
let createUser: CreateUserService


describe('AuthenticateUser', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    authUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider)
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

  })

  it('should be able to auth a new user', async () => {

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
    const authUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    )
    
    await expect(
      authUser.execute({
        email: 'aaa@aaa.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to auth with wrong password', async () => {
    const user = await createUser.execute({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    await expect(
      authUser.execute({
        email: 'aaa@aaa.com',
        password: '1234567'
      })
    ).rejects.toBeInstanceOf(AppError)

  })
})