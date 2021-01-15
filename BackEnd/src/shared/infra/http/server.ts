import 'reflect-metadata'
import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from './routes'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.tmpFolder))
app.use(routes)

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })

})

app.listen(3333, () => {
  console.log('👻 Tô online buuuuuuh 👻')
})