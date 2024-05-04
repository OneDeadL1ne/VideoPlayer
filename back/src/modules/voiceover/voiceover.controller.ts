import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common'
import { VoiceoverService } from './voiceover.service'
import { CreateVoiceoverDto, UpdateVoiceoverDto } from './dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
@ApiBearerAuth()
@ApiTags('Voiceover')
@Controller('voiceover')
@UseFilters(AllExceptionsFilter)
export class VoiceoverController {
  constructor(private readonly voiceoverService: VoiceoverService) {}
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  create(@Body() createVoiceoverDto: CreateVoiceoverDto) {
    return this.voiceoverService.create(createVoiceoverDto)
  }

  @Get()
  findAll() {
    return this.voiceoverService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voiceoverService.findOne(+id)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  update(@Body() updateVoiceoverDto: UpdateVoiceoverDto) {
    return this.voiceoverService.update(updateVoiceoverDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voiceoverService.remove(+id)
  }
}
