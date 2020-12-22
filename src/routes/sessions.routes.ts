import {Router} from 'express'
import AuthenticateUserService from '../service/AuthenticateUserService'

const sessionRouter = Router()

sessionRouter.post('/', async (req, res) => {
  try{
    const {email, password} = req.body

    const AuthenticateUser = new AuthenticateUserService()

    const { user, token } = await AuthenticateUser.execute({
      email,
      password
    })

    // delete user["password"]

    return res.json({user, token})
  }catch(err){
    return res.status(400).json({error: err.message})
  }
  
})

export default sessionRouter