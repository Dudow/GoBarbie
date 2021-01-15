import 'reflect-metadata'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeStorageProvider from '@shared/container/providers/storageProvider/fakes/fakeStorageProvider'
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeStorageProvider = new FakeStorageProvider()
    updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)
  })

  it('should be able to change avatar', async () => {

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should not be able to change avatar (invalid ID)', async () => {
    expect(
      updateUserAvatar.execute({
        user_id: 'blabla',
        avatarFilename: 'avatar.jpg'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })


    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')

    expect(user.avatar).toBe('avatar2.jpg')
  })
})