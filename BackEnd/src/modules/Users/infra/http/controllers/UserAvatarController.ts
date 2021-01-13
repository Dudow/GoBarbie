import {Request, Response} from 'express'
import {container} from 'tsyringe'

import UpdateUserAvatarService from '@modules/Users/services/UpdateUserAvatarService'

export default class SessionsController {
  public async update(req:Request, res:Response): Promise<Response>{
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: req.userId,
      avatarFilename: req.file.filename
    })
  
    return res.json(user)
  }
}