import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common'
import { GenderService } from './gender.service'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreateGenderDto, UpdateGenderDto } from './dto'

@ApiBearerAuth()
@ApiTags('Gender')
@Controller('gender')
@UseFilters(AllExceptionsFilter)
export class GenderController {
  constructor(private readonly genderService: GenderService) {}
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  async create(@Body() createGenderDto: CreateGenderDto) {
    return await this.genderService.create(createGenderDto)
  }

  @Get()
  async findAll() {
    return await this.genderService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.genderService.findOne(+id)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() updateGenderDto: UpdateGenderDto) {
    return await this.genderService.update(updateGenderDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.genderService.remove(+id)
  }
}
