import 'reflect-metadata'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/hashProvider/fakes/fakeHashProvider'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService


describe('CreateUser', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {

    const user = await createUser.execute({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')

  })

  it('should not be able to create a new user with a repeated email', async () => {
    await createUser.execute({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    await expect(
      createUser.execute({
        name: 'aaa',
        email: 'aaa@aaa.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)

  })
})