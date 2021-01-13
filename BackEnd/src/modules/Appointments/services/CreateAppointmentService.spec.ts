// const CreateAppointmentService = require('./CreateAppointmentService')
// const FakeAppointmentRepository = require('../repositories/fakes/FakeAppointmentsRepository')
import 'reflect-metadata'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456789'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123456789')

  })

  // it('should not be able to create a two appointments at the same time', () => {

  // })
})