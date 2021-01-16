import 'reflect-metadata'

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'
import FakeHashProvider from '../providers/hashProvider/fakes/fakeHashProvider'
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    updateProfile = new UpdateProfileService(fakeUserRepository, fakeHashProvider)
  })

  it('should be able to update profile data', async () => {

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'jaqueline',
      email: 'jaqueline@kkk.com',
    })

    expect(updatedUser.name).toBe('jaqueline')
    expect(updatedUser.email).toBe('jaqueline@kkk.com')
  })

  it('should not be able to update profile with an already used email', async () => {

    await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@aaa.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'jaqueline',
        email: 'aaa@aaa.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update password', async () => {

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'jaqueline',
      email: 'jaqueline@kkk.com',
      old_password: '123456',
      password: 'testing'
    })

    expect(updatedUser.password).toBe('testing')
  })

  it('should not be able to update password (missing old password)', async () => {

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

     await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'jaqueline',
        email: 'jaqueline@kkk.com',
        password: 'testing'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update password (wrong old password)', async () => {

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

     await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'jaqueline',
        email: 'jaqueline@kkk.com',
        old_password: 'wrong',
        password: 'testing'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to show profile data (non-existing-user)', async () => {

    expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'jaqueline',
        email: 'jaqueline@kkk.com',
        old_password: 'wrong',
        password: 'testing'
      })
    ).rejects.toBeInstanceOf(AppError)
  }) 
})