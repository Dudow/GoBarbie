import Appointment from '../models/appointment'
import AppointmentsRepository from '../repositories/AppointmentRepository'
import { startOfHour} from 'date-fns'
import {getCustomRepository} from 'typeorm'

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentByDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentByDate) throw new Error('this time is already booked');

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}


export default CreateAppointmentService