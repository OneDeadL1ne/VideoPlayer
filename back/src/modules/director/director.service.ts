import { Injectable } from '@nestjs/common'
import { CreateDirectorDto, UpdateDirectorDto } from './dto'
import { Director } from './entities/director.entity'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director)
    private directorRepository: typeof Director,
  ) {}
  async create(createDirectorDto: CreateDirectorDto) {
    try {
      const newDirector = await this.directorRepository.create({ ...createDirectorDto })
      return { status: true, data: newDirector }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      return await this.directorRepository.findAll({ order: [['id_director', 'ASC']] })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id_director: number) {
    try {
      return await this.directorRepository.findOne({ where: { id_director } })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(updateDirectorDto: UpdateDirectorDto) {
    try {
      await this.directorRepository.update({ ...updateDirectorDto }, { where: { id_director: updateDirectorDto.id_director } })

      const foundDirector = await this.directorRepository.findOne({ where: { id_director: updateDirectorDto.id_director } })

      return foundDirector
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id_director: number) {
    try {
      const deleteDirector = await this.directorRepository.destroy({ where: { id_director: id_director } })
      if (deleteDirector) {
        return { status: true }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
