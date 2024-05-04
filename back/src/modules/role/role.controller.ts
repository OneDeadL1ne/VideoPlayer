import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto, UpdateRoleDto } from './dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'

@ApiBearerAuth()
@ApiTags('Role')
@UseFilters(AllExceptionsFilter)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get()
  findAll() {
    return this.roleService.findAll()
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id)
  }
}
