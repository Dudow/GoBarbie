import {container} from 'tsyringe'

import '@modules/Users/providers'
import './providers'

import AppointmentRepoInterface from '@modules/Appointments/repositories/AppointmentsRepositoryInterface'
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/repositories/AppointmentRepository'

import UsersRepoInterface from '@modules/Users/repositories/UsersRepositoryInterface'
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository'

import UserTokensRepoInterface from '@modules/Users/repositories/UserTokensRepositoryInterface'
import UserTokensRepository from '@modules/Users/infra/typeorm/repositories/UserTokensRepository'

container.registerSingleton<AppointmentRepoInterface>('AppointmentsRepository', AppointmentsRepository)
container.registerSingleton<UsersRepoInterface>('UsersRepository', UsersRepository)
container.registerSingleton<UserTokensRepoInterface>('UserTokensRepository', UserTokensRepository)