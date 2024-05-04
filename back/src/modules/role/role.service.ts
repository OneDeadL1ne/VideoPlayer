import { Injectable } from '@nestjs/common'
import { CreateRoleDto, UpdateRoleDto } from './dto'
import { InjectModel } from '@nestjs/sequelize'

import { Role } from './entities/role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private roleRepository: typeof Role,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const newRole = await this.roleRepository.create({ ...createRoleDto })
      return { status: true, data: newRole }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      return await this.roleRepository.findAll({ order: [['id_role', 'ASC']] })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id_role: number) {
    try {
      return await this.roleRepository.findOne({ where: { id_role } })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(updateRoleDto: UpdateRoleDto) {
    try {
      await this.roleRepository.update({ ...updateRoleDto }, { where: { id_role: updateRoleDto.id_role } })

      const foundRole = await this.roleRepository.findOne({ where: { id_role: updateRoleDto.id_role } })

      return foundRole
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id_role: number) {
    try {
      const deleteRole = await this.roleRepository.destroy({ where: { id_role: id_role } })
      if (deleteRole) {
        return { status: true }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
