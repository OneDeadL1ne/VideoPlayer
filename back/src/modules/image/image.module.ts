import { ImageService } from './image.service'
import { ImageController } from './image.controller'
import { UserService } from '../user/user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Person } from '../person/entities/person.entity'
import { User } from '../user/entities/user.entity'
import { Module } from '@nestjs/common'
@Module({
  imports: [SequelizeModule.forFeature([User, Person])],
  controllers: [ImageController],
  providers: [ImageService, UserService],
  exports: [ImageModule],
})
export class ImageModule {}
