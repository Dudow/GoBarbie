import {Router} from 'express'
import appointmentsRouter from '@modules/Appointments/infra/http/routes/appointments.routes'
import usersRouter from '@modules/Users/infra/http/routes/users.routes'
import sessionRouter from '@modules/Users/infra/http/routes/sessions.routes'
import passwordRouter from '@modules/Users/infra/http/routes/password.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionRouter)
routes.use('/password', passwordRouter)

export default routes