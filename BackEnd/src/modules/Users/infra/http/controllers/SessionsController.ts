import {Request, Response} from 'express'
import {container} from 'tsyringe'

import AuthenticateUserService from '@modules/Users/services/AuthenticateUserService'

export default class SessionsController {
  public async create(req:Request, res:Response): Promise<Response>{
    const {email, password} = req.body
  
    const AuthenticateUser = container.resolve(AuthenticateUserService)
  
    const { user, token } = await AuthenticateUser.execute({
      email,
      password
    })
  
    // delete user["password"]
  
    return res.json({user, token})
  }
}