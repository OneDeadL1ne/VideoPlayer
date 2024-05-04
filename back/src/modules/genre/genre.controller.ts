import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common'
import { GenreService } from './genre.service'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'
import { CreateGenreDto, UpdateGenreDto } from './dto'

@ApiBearerAuth()
@ApiTags('Genre')
@Controller('genre')
@UseFilters(AllExceptionsFilter)
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    return await this.genreService.create(createGenreDto)
  }

  @Get()
  async findAll() {
    return await this.genreService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.genreService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() updateGenreDto: UpdateGenreDto) {
    return await this.genreService.update(updateGenreDto)
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.genreService.remove(+id)
  }
}
