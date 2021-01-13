import Appointment from '../infra/typeorm/entities/appointment';
import CreateAppointmentDTO from '../dto/CreateAppointmentDTO'

export default interface AppointmentsRepository{
  findByDate(date:Date): Promise<Appointment | undefined>;
  create(date: CreateAppointmentDTO): Promise<Appointment>
}