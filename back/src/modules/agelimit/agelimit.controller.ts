import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common'
import { AgelimitService } from './agelimit.service'
import { CreateAgelimitDto, UpdateAgelimitDto } from './dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
@ApiBearerAuth()
@ApiTags('Agelimit')
@Controller('agelimit')
@UseFilters(AllExceptionsFilter)
export class AgelimitController {
  constructor(private readonly agelimitService: AgelimitService) {}
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  create(@Body() createAgelimitDto: CreateAgelimitDto) {
    return this.agelimitService.create(createAgelimitDto)
  }

  @Get()
  findAll() {
    return this.agelimitService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agelimitService.findOne(+id)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch(':id')
  update(@Body() updateAgelimitDto: UpdateAgelimitDto) {
    return this.agelimitService.update(updateAgelimitDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agelimitService.remove(+id)
  }
}
