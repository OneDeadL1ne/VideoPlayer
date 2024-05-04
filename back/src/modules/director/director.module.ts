import { Module } from '@nestjs/common'
import { DirectorService } from './director.service'
import { DirectorController } from './director.controller'
import { Director } from './entities/director.entity'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserService } from '../user/user.service'
import { PersonService } from '../person/person.service'
import { User } from '../user/entities/user.entity'
import { Person } from '../person/entities/person.entity'
import { UserModule } from '../user/user.module'
import { PersonModule } from '../person/person.module'

@Module({
  imports: [SequelizeModule.forFeature([Director, User, Person]), UserModule, PersonModule],
  controllers: [DirectorController],
  providers: [DirectorService, UserService, PersonService],
  exports: [DirectorService],
})
export class DirectorModule {}
