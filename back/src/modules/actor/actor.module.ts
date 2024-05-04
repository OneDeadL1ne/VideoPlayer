import { Module } from '@nestjs/common'
import { ActorService } from './actor.service'
import { ActorController } from './actor.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Person } from '../person/entities/person.entity'
import { PersonModule } from '../person/person.module'
import { User } from '../user/entities/user.entity'
import { UserModule } from '../user/user.module'
import { Actor } from './entities/actor.entity'

@Module({
  imports: [SequelizeModule.forFeature([Actor, User, Person]), UserModule, PersonModule],
  controllers: [ActorController],
  providers: [ActorService],
  exports: [ActorModule],
})
export class ActorModule {}
