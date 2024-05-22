import { Injectable } from '@nestjs/common'

import { Person } from './entities/person.entity'
import { InjectModel } from '@nestjs/sequelize'
import { CreatePersonDto, UpdatePersonDto } from './dto'

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person)
    private personModel: typeof Person,
  ) {}
  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person'
  }

  findAll() {
    return ''
  }

  findOne(id: number) {
    return `This action returns a #${id} person`
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`
  }

  remove(id: number) {
    return `This action removes a #${id} person`
  }
}
