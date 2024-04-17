import { Injectable } from '@nestjs/common';
import { CreateAgelimitDto } from './dto/create-agelimit.dto';
import { UpdateAgelimitDto } from './dto/update-agelimit.dto';

@Injectable()
export class AgelimitService {
  create(createAgelimitDto: CreateAgelimitDto) {
    return 'This action adds a new agelimit';
  }

  findAll() {
    return `This action returns all agelimit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agelimit`;
  }

  update(id: number, updateAgelimitDto: UpdateAgelimitDto) {
    return `This action updates a #${id} agelimit`;
  }

  remove(id: number) {
    return `This action removes a #${id} agelimit`;
  }
}
