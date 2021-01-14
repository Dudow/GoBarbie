import { v4 } from 'uuid'
import { isEqual } from 'date-fns'

import AppointmentsRepositoryInterface from '@modules/Appointments/repositories/AppointmentsRepositoryInterface'
import AppointmentDTO from '@modules/Appointments/dto/CreateAppointmentDTO'

import Appointment from '../../infra/typeorm/entities/appointment'

class AppointmentsRepository implements AppointmentsRepositoryInterface {

  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async create({provider_id, date}: AppointmentDTO):Promise<Appointment>{
    const appointment = new Appointment()

    Object.assign(appointment, {id: v4(), date, provider_id})

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository