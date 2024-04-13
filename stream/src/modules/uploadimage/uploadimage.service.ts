import { Injectable } from '@nestjs/common';
import { CreateUploadimageDto } from './dto/create-uploadimage.dto';
import { UpdateUploadimageDto } from './dto/update-uploadimage.dto';

@Injectable()
export class UploadimageService {
  create(createUploadimageDto: CreateUploadimageDto) {
    return 'This action adds a new uploadimage';
  }

  findAll() {
    return `This action returns all uploadimage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadimage`;
  }

  update(id: number, updateUploadimageDto: UpdateUploadimageDto) {
    return `This action updates a #${id} uploadimage`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadimage`;
  }
}
