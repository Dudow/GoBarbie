import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {

  tmpFolder: tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback){
      const filehash = crypto.randomBytes(10).toString('hex')
      const fileName = `${filehash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}