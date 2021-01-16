import {Request, Response} from 'express'
import {container} from 'tsyringe'

import UpdateProfileService from '@modules/Users/services/UpdateProfileService'
import ShowProfileService from '@modules/Users/services/ShowProfileService'

export default class ProfileController {

  public async show(req:Request, res:Response): Promise<Response>{
    try{
      const user_id = req.userId
    
      const showProfile = container.resolve(ShowProfileService)

      const user = await showProfile.execute({user_id})

      return res.json(user)
    }catch(err){
      return res.status(400).json({error: err.message})
    }
  }

  public async update(req:Request, res:Response): Promise<Response>{
    try{
      const user_id = req.userId
      const {name, email, password, old_password} = req.body

      const updateProfile = container.resolve(UpdateProfileService)

      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        password,
        old_password,
      })

      // delete user["password"]
  
      return res.json(user)
    }catch(err){
      return res.status(400).json({error: err.message})
    }
  }
}