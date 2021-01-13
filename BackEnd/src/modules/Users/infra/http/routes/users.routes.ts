import {Router} from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UsersControllers from '../controllers/UsersController'
import AvatarController from '../controllers/UserAvatarController'

const usersRouter = Router()
const upload = multer(uploadConfig)
const usersController = new UsersControllers()
const avatarController = new AvatarController()

usersRouter.post('/', usersController.create)

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), avatarController.update)

export default usersRouter