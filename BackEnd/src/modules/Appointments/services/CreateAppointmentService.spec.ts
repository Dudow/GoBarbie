import 'reflect-metadata'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'
import AppError from '@shared/errors/AppError'

let fakeAppointmentRepository: FakeAppointmentRepository
let createAppointment: CreateAppointmentService


describe('CreateAppointment', () => {

  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

  })

  it('should be able to create a new appointment', async () => {

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: '123456789'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123456789')

  })

  it('should not be able to create a two appointments at the same time', async () => {
    const appointmentDate = new Date()

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456789'
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456789'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})