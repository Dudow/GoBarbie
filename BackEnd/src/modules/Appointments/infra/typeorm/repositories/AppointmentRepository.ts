import { getRepository, Repository } from 'typeorm'

import AppointmentsRepositoryInterface from '@modules/Appointments/repositories/AppointmentsRepositoryInterface'
import Appointment from '../entities/appointment'
import AppointmentDTO from '@modules/Appointments/dto/CreateAppointmentDTO'

class AppointmentsRepository implements AppointmentsRepositoryInterface {

  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {date}
    })

    return findAppointment
  }

  public async create({provider_id, date}: AppointmentDTO):Promise<Appointment>{
    const appointment = this.ormRepository.create({provider_id, date})

    await this.ormRepository.save(appointment)

    return appointment
  }
}

export default AppointmentsRepository