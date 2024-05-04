import { Module } from '@nestjs/common'
import { PersonService } from './person.service'
import { PersonController } from './person.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Person } from './entities/person.entity'
import { UserService } from '../user/user.service'
import { User } from '../user/entities/user.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [SequelizeModule.forFeature([Person, User]), UserModule],
  controllers: [PersonController],
  providers: [PersonService, UserService],
  exports: [PersonService],
})
export class PersonModule {}
