import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from '../role/entities/role.entity'
import { Person } from '../person/entities/person.entity'
import { User } from './entities/user.entity'

import { RoleService } from '../role/role.service'

@Module({
  imports: [SequelizeModule.forFeature([User, Person, Role])],
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService],
})
export class UserModule {}
