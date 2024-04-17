import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from '../person/entities/person.entity';

@Injectable()
export class GenderService {
  constructor( 
  @InjectModel(Gender)
  private genderModel: typeof Gender
){}
  create(createGenderDto: CreateGenderDto) {
    return 'This action adds a new gender';
  }

  async findAll() {
    return await this.genderModel.findAll({include:[Person]});
  }

  findOne(id: number) {
    return `This action returns a #${id} gender`;
  }

  update(id: number, updateGenderDto: UpdateGenderDto) {
    return `This action updates a #${id} gender`;
  }

  remove(id: number) {
    return `This action removes a #${id} gender`;
  }
}
