import {Request, Response} from 'express'
import {container} from 'tsyringe'

import SendForgotPasswordEmailService from '@modules/Users/services/SendForgotPasswordEmailService'

export default class ForgotPassowrdController {
  public async create(req:Request, res:Response): Promise<Response>{
    const {email} = req.body
  
    const forgotPasswordEmail = container.resolve(SendForgotPasswordEmailService)
  
    await forgotPasswordEmail.execute({
      email,
    })
  
    return res.json().status(204)
  }
}