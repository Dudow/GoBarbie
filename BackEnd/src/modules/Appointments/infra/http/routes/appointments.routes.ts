import {Router} from 'express'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import appointentController from '../controllers/appointemntController'

const appointmentsRouter = Router()
const appointmentsController = new appointentController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter