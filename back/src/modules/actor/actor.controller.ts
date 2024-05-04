import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters } from '@nestjs/common'
import { ActorService } from './actor.service'
import { CreateActorDto, UpdateActorDto } from './dto'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
@ApiBearerAuth()
@ApiTags('Actor')
@Controller('actor')
@UseFilters(AllExceptionsFilter)
export class ActorController {
  constructor(private readonly actorService: ActorService) {}
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  async create(@Body() createActorDto: CreateActorDto) {
    return await this.actorService.create(createActorDto)
  }

  @Get()
  async findAll() {
    return await this.actorService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.actorService.findOne(+id)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() updateActorDto: UpdateActorDto) {
    return await this.actorService.update(updateActorDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.actorService.remove(+id)
  }
}
