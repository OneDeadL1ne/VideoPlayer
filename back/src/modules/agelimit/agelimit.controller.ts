import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgelimitService } from './agelimit.service';
import { CreateAgelimitDto } from './dto/create-agelimit.dto';
import { UpdateAgelimitDto } from './dto/update-agelimit.dto';

@Controller('agelimit')
export class AgelimitController {
  constructor(private readonly agelimitService: AgelimitService) {}

  @Post()
  create(@Body() createAgelimitDto: CreateAgelimitDto) {
    return this.agelimitService.create(createAgelimitDto);
  }

  @Get()
  findAll() {
    return this.agelimitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agelimitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgelimitDto: UpdateAgelimitDto) {
    return this.agelimitService.update(+id, updateAgelimitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agelimitService.remove(+id);
  }
}
