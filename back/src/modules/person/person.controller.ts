import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common'
import { PersonService } from './person.service'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'

@ApiBearerAuth()
@ApiTags('Person')
@UseFilters(AllExceptionsFilter)
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto)
  }

  @Get()
  findAll() {
    return this.personService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id)
  }
}
