import {Request, Response} from 'express'
import { parseISO} from 'date-fns'
// import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/Appointments/services/CreateAppointmentService'
import AppointmentsRepository from '../../typeorm/repositories/AppointmentRepository'


export default class AppointmentController{
  public async create (req:Request, res:Response): Promise<Response>{
    const {provider_id, date} = req.body
  
    const parsedDate = parseISO(date)
  
    const appointmentRepository = new AppointmentsRepository()
    const createAppointment = new CreateAppointmentService(appointmentRepository)
    
    const appointment = await createAppointment.execute({date:parsedDate, provider_id})
    
    return res.json(appointment)
  }
}


// export default class AppointmentController{
//   public async create (req:Request, res:Response): Promise<Response>{
//     const {provider_id, date} = req.body
  
//     const parsedDate = parseISO(date)
  
//     const createAppointment = container.resolve(CreateAppointmentService)
    
//     const appointment = await createAppointment.execute({date:parsedDate, provider_id})
    
//     return res.json(appointment)
//   }
// }