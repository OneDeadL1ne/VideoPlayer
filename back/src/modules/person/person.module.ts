import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './entities/person.entity';
import { GenderModule } from '../gender/gender.module';


@Module({
  imports:[SequelizeModule.forFeature([Person]), GenderModule],
  controllers: [PersonController],
  providers: [PersonService],
  exports:[PersonService]
})
export class PersonModule {}
