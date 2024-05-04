import { Injectable } from '@nestjs/common'

import { Gender } from './entities/gender.entity'
import { InjectModel } from '@nestjs/sequelize'
import { CreateGenderDto, UpdateGenderDto } from './dto'

@Injectable()
export class GenderService {
  constructor(
    @InjectModel(Gender)
    private genderRepository: typeof Gender,
  ) {}
  async create(createGenderDto: CreateGenderDto) {
    try {
      const newGenre = await this.genderRepository.create({ ...createGenderDto })

      return { status: true, data: newGenre }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      return await this.genderRepository.findAll({ order: [['id_gender', 'ASC']] })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id_gender: number) {
    try {
      return await this.genderRepository.findOne({ where: { id_gender } })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(updateGenderDto: UpdateGenderDto) {
    try {
      await this.genderRepository.update({ ...updateGenderDto }, { where: { id_gender: updateGenderDto.id_gender } })

      const foundGender = await this.genderRepository.findOne({
        where: { id_gender: updateGenderDto.id_gender },
      })

      return foundGender
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id_gender: number) {
    try {
      const deleteGender = await this.genderRepository.destroy({ where: { id_gender: id_gender } })

      if (deleteGender) {
        return { status: true }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
