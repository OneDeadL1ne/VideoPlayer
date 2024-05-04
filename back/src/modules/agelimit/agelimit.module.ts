import { Module } from '@nestjs/common'
import { AgelimitService } from './agelimit.service'
import { AgelimitController } from './agelimit.controller'
import { UserService } from '../user/user.service'
import { PersonService } from '../person/person.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Person } from '../person/entities/person.entity'
import { PersonModule } from '../person/person.module'
import { User } from '../user/entities/user.entity'
import { UserModule } from '../user/user.module'
import { Agelimit } from './entities/agelimit.entity'

@Module({
  imports: [SequelizeModule.forFeature([Agelimit, User, Person]), UserModule, PersonModule],
  controllers: [AgelimitController],
  providers: [AgelimitService, UserService, PersonService],
  exports: [AgelimitModule],
})
export class AgelimitModule {}
