import 'reflect-metadata'

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let showProfile: ShowProfileService

describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    showProfile = new ShowProfileService(fakeUserRepository)
  })

  it('should be able to show profile data', async () => {

    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    })

    const profile = await showProfile.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('aaa')
    expect(profile.email).toBe('aaa@aaa.com')
  }) 

  it('should not be able to show profile data (non-existing-user)', async () => {

    expect(
      showProfile.execute({
        user_id: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  }) 
})