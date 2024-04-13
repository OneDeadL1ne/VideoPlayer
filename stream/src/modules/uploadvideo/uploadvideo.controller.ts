import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UploadvideoService } from './uploadvideo.service';
import { CreateUploadvideoDto } from './dto/create-uploadvideo.dto';
import { UpdateUploadvideoDto } from './dto/update-uploadvideo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("uploadvideo")
@Controller('uploadvideo')
export class UploadvideoController {
  constructor(private readonly uploadvideoService: UploadvideoService) {}

  @Post()
  create(@Body() createUploadvideoDto: CreateUploadvideoDto) {
    return this.uploadvideoService.create(createUploadvideoDto);
  }

  @Get()
  findAll() {
    return this.uploadvideoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadvideoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadvideoDto: UpdateUploadvideoDto) {
    return this.uploadvideoService.update(+id, updateUploadvideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadvideoService.remove(+id);
  }
}
