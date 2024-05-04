import { Module } from '@nestjs/common'
import { GenreService } from './genre.service'
import { GenreController } from './genre.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Genre } from './entities/genre.entity'
import { UserService } from '../user/user.service'
import { UserModule } from '../user/user.module'
import { User } from '../user/entities/user.entity'
import { PersonService } from '../person/person.service'
import { PersonModule } from '../person/person.module'
import { Person } from '../person/entities/person.entity'

@Module({
  imports: [SequelizeModule.forFeature([Genre, User, Person]), UserModule, PersonModule],
  controllers: [GenreController],
  providers: [GenreService, UserService, PersonService],
  exports: [GenreService],
})
export class GenreModule {}
