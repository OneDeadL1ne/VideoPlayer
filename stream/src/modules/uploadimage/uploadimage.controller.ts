import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UploadimageService } from './uploadimage.service';
import { CreateUploadimageDto } from './dto/create-uploadimage.dto';
import { UpdateUploadimageDto } from './dto/update-uploadimage.dto';

@Controller('uploadimage')
export class UploadimageController {
  constructor(private readonly uploadimageService: UploadimageService) {}

  @Post()
  create(@Body() createUploadimageDto: CreateUploadimageDto) {
    return this.uploadimageService.create(createUploadimageDto);
  }

  @Get()
  findAll() {
    return this.uploadimageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadimageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadimageDto: UpdateUploadimageDto) {
    return this.uploadimageService.update(+id, updateUploadimageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadimageService.remove(+id);
  }
}
