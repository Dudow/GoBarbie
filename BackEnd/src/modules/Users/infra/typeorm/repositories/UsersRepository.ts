import { getRepository, Repository } from 'typeorm'

import User from '../entities/User'
import UsersRepositoryInterface from '@modules/Users/repositories/UsersRepositoryInterface'
import UserDTO from '@modules/Users/dto/CreateUserDTO'

class UsersRepository implements UsersRepositoryInterface {

  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({
      where: {email}
    })

    return user
  }

  public async create({name, email, password}: UserDTO):Promise<User>{
    const appointment = this.ormRepository.create({name, email, password})

    await this.ormRepository.save(appointment)

    return appointment
  }

  public async save (user:User): Promise<User>{
    return this.ormRepository.save(user)
  }
}

export default UsersRepository