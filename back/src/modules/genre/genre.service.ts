import { Injectable } from '@nestjs/common'

import { Genre } from './entities/genre.entity'
import { InjectModel } from '@nestjs/sequelize'
import { CreateGenreDto, UpdateGenreDto } from './dto'

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre) private genreRepository: typeof Genre) {}

  async create(createGenreDto: CreateGenreDto) {
    try {
      const newGenre = await this.genreRepository.create({ ...createGenreDto })

      return { status: true, data: newGenre }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      return await this.genreRepository.findAll({ order: [['id_genre', 'ASC']] })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id_genre: number) {
    try {
      return await this.genreRepository.findOne({ where: { id_genre } })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(updateGenreDto: UpdateGenreDto) {
    try {
      await this.genreRepository.update({ ...updateGenreDto }, { where: { id_genre: updateGenreDto.id_genre } })

      const foundGenre = await this.genreRepository.findOne({
        where: { id_genre: updateGenreDto.id_genre },
      })

      return foundGenre
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id_genre: number) {
    try {
      const deleteGenre = await this.genreRepository.destroy({ where: { id_genre: id_genre } })

      if (deleteGenre) {
        return { status: true }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
