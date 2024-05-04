import { Injectable } from '@nestjs/common'
import { CreateAgelimitDto, UpdateAgelimitDto } from './dto'
import { Agelimit } from './entities/agelimit.entity'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class AgelimitService {
  constructor(
    @InjectModel(Agelimit)
    private agelimitRepository: typeof Agelimit,
  ) {}
  async create(createAgelimitDto: CreateAgelimitDto) {
    try {
      const newGenre = await this.agelimitRepository.create({ ...createAgelimitDto })
      return { status: true, data: newGenre }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      return await this.agelimitRepository.findAll({ order: [['id_age_limit', 'ASC']] })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id_age_limit: number) {
    try {
      return await this.agelimitRepository.findOne({ where: { id_age_limit } })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(updateAgelimitDto: UpdateAgelimitDto) {
    try {
      await this.agelimitRepository.update({ ...updateAgelimitDto }, { where: { id_age_limit: updateAgelimitDto.id_age_limit } })

      const foundAgeLimit = await this.agelimitRepository.findOne({ where: { id_age_limit: updateAgelimitDto.id_age_limit } })

      return foundAgeLimit
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id_age_limit: number) {
    try {
      const deleteAgeLimit = await this.agelimitRepository.destroy({ where: { id_age_limit: id_age_limit } })

      if (deleteAgeLimit) {
        return { status: true }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
