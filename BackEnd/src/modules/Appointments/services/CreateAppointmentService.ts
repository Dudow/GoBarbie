import { startOfHour} from 'date-fns'
import { injectable, inject } from 'tsyringe'

import Appointment from '../infra/typeorm/entities/appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepositoryInterface'
import AppError from '@shared/errors/AppError'

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository
    ) {}

  public async execute({
    provider_id,
    date,
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentByDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentByDate) throw new AppError('this time is already booked');

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}


export default CreateAppointmentService