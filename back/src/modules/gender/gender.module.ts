import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Gender } from './entities/gender.entity';
import { Person } from '../person/entities/person.entity';
import { PersonService } from '../person/person.service';


@Module({
  imports:[SequelizeModule.forFeature([Gender,Person])],
  controllers: [GenderController],
  providers: [GenderService, PersonService],
  exports:[GenderService]
})
export class GenderModule {}
