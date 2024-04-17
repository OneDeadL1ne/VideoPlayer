import { Injectable } from '@nestjs/common';
import { CreateVoiceoverDto } from './dto/create-voiceover.dto';
import { UpdateVoiceoverDto } from './dto/update-voiceover.dto';

@Injectable()
export class VoiceoverService {
  create(createVoiceoverDto: CreateVoiceoverDto) {
    return 'This action adds a new voiceover';
  }

  findAll() {
    return `This action returns all voiceover`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voiceover`;
  }

  update(id: number, updateVoiceoverDto: UpdateVoiceoverDto) {
    return `This action updates a #${id} voiceover`;
  }

  remove(id: number) {
    return `This action removes a #${id} voiceover`;
  }
}
