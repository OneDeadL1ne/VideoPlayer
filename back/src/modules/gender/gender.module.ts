import { Module } from '@nestjs/common'
import { GenderService } from './gender.service'
import { GenderController } from './gender.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Gender } from './entities/gender.entity'

import { UserService } from '../user/user.service'
import { UserModule } from '../user/user.module'
import { User } from '../user/entities/user.entity'
import { PersonService } from '../person/person.service'
import { PersonModule } from '../person/person.module'
import { Person } from '../person/entities/person.entity'

@Module({
  imports: [SequelizeModule.forFeature([Gender, User, Person]), UserModule, PersonModule],
  controllers: [GenderController],
  providers: [GenderService, UserService, PersonService],
  exports: [GenderService],
})
export class GenderModule {}
