import {container} from 'tsyringe'

import AppointmentRepoInterface from '@modules/Appointments/repositories/AppointmentsRepositoryInterface'
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentRepository'

import UsersRepoInterface from '@modules/Users/repositories/UsersRepositoryInterface'
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<AppointmentRepoInterface>('AppointmentsRepository', AppointmentsRepository)
container.registerSingleton<UsersRepoInterface>('UsersRepository', UsersRepository)