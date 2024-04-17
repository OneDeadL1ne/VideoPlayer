import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoiceoverService } from './voiceover.service';
import { CreateVoiceoverDto } from './dto/create-voiceover.dto';
import { UpdateVoiceoverDto } from './dto/update-voiceover.dto';

@Controller('voiceover')
export class VoiceoverController {
  constructor(private readonly voiceoverService: VoiceoverService) {}

  @Post()
  create(@Body() createVoiceoverDto: CreateVoiceoverDto) {
    return this.voiceoverService.create(createVoiceoverDto);
  }

  @Get()
  findAll() {
    return this.voiceoverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voiceoverService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoiceoverDto: UpdateVoiceoverDto) {
    return this.voiceoverService.update(+id, updateVoiceoverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voiceoverService.remove(+id);
  }
}
