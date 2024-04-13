import { Injectable } from '@nestjs/common';
import { CreateUploadvideoDto } from './dto/create-uploadvideo.dto';
import { UpdateUploadvideoDto } from './dto/update-uploadvideo.dto';

@Injectable()
export class UploadvideoService {
  create(createUploadvideoDto: CreateUploadvideoDto) {
    return 'This action adds a new uploadvideo';
  }

  findAll() {
    return `This action returns all uploadvideo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadvideo`;
  }

  update(id: number, updateUploadvideoDto: UpdateUploadvideoDto) {
    return `This action updates a #${id} uploadvideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadvideo`;
  }
}
