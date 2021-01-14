import 'reflect-metadata'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/hashProvider/fakes/fakeHashProvider'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/AppError'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')

  })

  it('should not be able to create a new user with a repeated email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

    await createUser.execute({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    expect(
      createUser.execute({
        name: 'aaa',
        email: 'aaa@aaa.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)

  })
})