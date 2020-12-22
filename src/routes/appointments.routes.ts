import {Router} from 'express'
import { parseISO} from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../service/CreateAppointmentService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (req, res) => {

  console.log(req.userId)

  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()
  
  return res.json(appointments)
})

appointmentsRouter.post('/', async (req, res) => {
  try{
    const {provider_id, date} = req.body
    
    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()
    
    const appointment = await createAppointment.execute({date:parsedDate, provider_id})
    
    return res.json(appointment)
  }catch(err){
    return res.status(400).json({error: err.message})
  }
  
})

export default appointmentsRouter