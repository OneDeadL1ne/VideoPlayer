import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common'
import { DirectorService } from './director.service'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreateDirectorDto, UpdateDirectorDto } from './dto'

@ApiBearerAuth()
@ApiTags('Director')
@UseFilters(AllExceptionsFilter)
@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  async create(@Body() createDirectorDto: CreateDirectorDto) {
    return await this.directorService.create(createDirectorDto)
  }

  @Get()
  async findAll() {
    return await this.directorService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.directorService.findOne(+id)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() updateDirectorDto: UpdateDirectorDto) {
    return await this.directorService.update(updateDirectorDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.directorService.remove(+id)
  }
}
