import { Injectable } from '@nestjs/common'
import { CreateFilmDto, UpdateFilmDto } from './dto'
import { Film } from './entities/film.entity'
import { InjectModel } from '@nestjs/sequelize'
import { Genre, GenreFilm } from '../genre/entities/genre.entity'
import { Actor, ActorFilm } from '../actor/entities/actor.entity'
import { Voiceover, VoiceoverFilm } from '../voiceover/entities/voiceover.entity'
import { Director, DirectorFilm } from '../director/entities/director.entity'
import { Sequelize } from 'sequelize-typescript'
import { generateVideo } from 'src/common/utils/generateVideo'
import { createReadStream } from 'fs'
import { ConfigService } from '@nestjs/config'
import { Agelimit } from '../agelimit/entities/agelimit.entity'
import { User } from '../user/entities/user.entity'

import { Op } from 'sequelize'

@Injectable()
export class FilmService {
  constructor(
    @InjectModel(Film) private filmRepository: typeof Film,
    @InjectModel(GenreFilm) private genreFilmRepository: typeof GenreFilm,
    @InjectModel(ActorFilm) private actorFilmRepository: typeof ActorFilm,
    @InjectModel(VoiceoverFilm) private voiceoverFilmRepository: typeof VoiceoverFilm,
    @InjectModel(DirectorFilm) private directorFilmRepository: typeof DirectorFilm,
    @InjectModel(User) private userRepository: typeof User,
    private readonly sequelize: Sequelize,
    private readonly configService: ConfigService,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    try {
      const newFilm = await this.filmRepository.create({ ...createFilmDto })

      if (!newFilm) {
        return { status: false }
      }

      if (createFilmDto.actor_ids.length != 0) {
        for (let index = 0; index < createFilmDto.actor_ids.length; index++) {
          const id = createFilmDto.actor_ids[index]
          await this.actorFilmRepository.create({ id_film: newFilm.id_film, id_actor: id, position_role: index })
        }
      }
      if (createFilmDto.director_ids.length != 0) {
        for (const id_director of createFilmDto.director_ids) {
          await this.directorFilmRepository.create({ id_film: newFilm.id_film, id_director: id_director })
        }
      }
      if (createFilmDto.voiceover_ids.length != 0) {
        for (const id_voiceover of createFilmDto.voiceover_ids) {
          await this.voiceoverFilmRepository.create({ id_film: newFilm.id_film, id_voiceover: id_voiceover })
        }
      }

      if (createFilmDto.genre_ids.length != 0) {
        for (const id_genre of createFilmDto.genre_ids) {
          await this.genreFilmRepository.create({ id_film: newFilm.id_film, id_genre: id_genre })
        }
      }

      const film = await this.filmRepository.findOne({ where: { id_film: newFilm.id_film } })

      if (film) {
        return { status: true, data: film }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll(id_user?: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id_user } })
      if (!user) {
        return await this.filmRepository.findAll({
          include: [
            { model: Agelimit, attributes: ['id_age_limit', 'age_limit_name'] },
            { model: Actor, through: { attributes: ['position_role'] }, order: ['ActorFilm.position_role', 'DESC'] },
            { model: Genre, through: { attributes: [] } },
            { model: Director, through: { attributes: [] } },
            { model: Voiceover, through: { attributes: [] } },
          ],
          attributes: { exclude: ['id_age_limit'] },
          where: { is_subscribe: false, trailer_path: { [Op.ne]: null }, preview_path: { [Op.ne]: null } },
        })
      }

      if (user) {
        const sub = user.is_subscrition
        const role = user.id_role

        if (sub) {
          return await this.filmRepository.findAll({
            include: [
              { model: Agelimit, attributes: ['id_age_limit', 'age_limit_name'] },
              { model: Actor, through: { attributes: ['position_role'] }, order: ['ActorFilm.position_role', 'DESC'] },
              { model: Genre, through: { attributes: [] } },
              { model: Director, through: { attributes: [] } },
              { model: Voiceover, through: { attributes: [] } },
            ],
            attributes: { exclude: ['id_age_limit'] },
            where: { trailer_path: { [Op.ne]: null }, preview_path: { [Op.ne]: null } },
          })
        }

        if (role != 1) {
          return await this.filmRepository.findAll({
            include: [
              { model: Agelimit, attributes: ['id_age_limit', 'age_limit_name'] },
              { model: Actor, through: { attributes: ['position_role'] }, order: ['ActorFilm.position_role', 'DESC'] },
              { model: Genre, through: { attributes: [] } },
              { model: Director, through: { attributes: [] } },
              { model: Voiceover, through: { attributes: [] } },
            ],
            attributes: { exclude: ['id_age_limit'] },
          })
        }

        return await this.filmRepository.findAll({
          include: [
            { model: Agelimit, attributes: ['id_age_limit', 'age_limit_name'] },
            { model: Actor, through: { attributes: ['position_role'] }, order: ['ActorFilm.position_role', 'DESC'] },
            { model: Genre, through: { attributes: [] } },
            { model: Director, through: { attributes: [] } },
            { model: Voiceover, through: { attributes: [] } },
          ],
          attributes: { exclude: ['id_age_limit'] },

          where: { is_subscribe: false, trailer_path: { [Op.ne]: null }, preview_path: { [Op.ne]: null } },
        })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id_film: number) {
    try {
      const film = await this.filmRepository.findOne({
        where: { id_film },
        include: [
          { model: Actor, through: { attributes: ['position_role'] } },
          { model: Genre, through: { attributes: [] } },
          { model: Director, through: { attributes: [] } },
          { model: Voiceover, through: { attributes: [] } },
        ],
      })

      if (film) {
        film.actors.sort((a, b) => {
          const positionA = a.ActorFilm.position_role
          const positionB = b.ActorFilm.position_role
          return positionA - positionB
        })

        return { status: true, data: film }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(updateFilmDto: UpdateFilmDto) {
    const t = await this.sequelize.transaction()
    try {
      await this.filmRepository.update({ ...updateFilmDto }, { where: { id_film: updateFilmDto.id_film }, transaction: t })
      if (updateFilmDto.actor_ids.length != 0) {
        await this.actorFilmRepository.destroy({ where: { id_film: updateFilmDto.id_film }, transaction: t })
        for (let index = 1; index <= updateFilmDto.actor_ids.length; index++) {
          const id_actor = updateFilmDto.actor_ids[index - 1]

          await this.actorFilmRepository.create({ id_film: updateFilmDto.id_film, id_actor: id_actor, position_role: index }, { transaction: t })
        }
      }

      if (updateFilmDto.director_ids.length != 0) {
        await this.directorFilmRepository.destroy({ where: { id_film: updateFilmDto.id_film }, transaction: t })
        for (const id_director of updateFilmDto.director_ids) {
          await this.directorFilmRepository.create({ id_film: updateFilmDto.id_film, id_director: id_director }, { transaction: t })
        }
      }

      if (updateFilmDto.genre_ids.length != 0) {
        await this.genreFilmRepository.destroy({ where: { id_film: updateFilmDto.id_film }, transaction: t })
        for (const id_genre of updateFilmDto.genre_ids) {
          await this.genreFilmRepository.create({ id_film: updateFilmDto.id_film, id_genre: id_genre }, { transaction: t })
        }
      }

      if (updateFilmDto.voiceover_ids.length != 0) {
        await this.voiceoverFilmRepository.destroy({ where: { id_film: updateFilmDto.id_film }, transaction: t })
        for (const id_voiceover of updateFilmDto.voiceover_ids) {
          await this.voiceoverFilmRepository.create({ id_film: updateFilmDto.id_film, id_voiceover: id_voiceover }, { transaction: t })
        }
      }
      await t.commit()

      const foundFilm = await this.filmRepository.findOne({
        where: { id_film: updateFilmDto.id_film },
        include: [
          { model: Actor, through: { attributes: [] }, order: [['position_role', 'ASC']] },
          { model: Genre, through: { attributes: [] } },
          { model: Director, through: { attributes: [] } },
          { model: Voiceover, through: { attributes: [] } },
        ],
      })

      if (foundFilm) {
        return { status: true, data: foundFilm }
      }

      return { status: false }
    } catch (error) {
      await t.rollback()
      throw new Error(error)
    }
  }

  async remove(id_film: number) {
    const t = await this.sequelize.transaction()
    try {
      const foundFilm = await this.filmRepository.findOne({
        where: { id_film: id_film },
        include: [
          { model: Actor, through: { attributes: [] } },
          { model: Genre, through: { attributes: [] } },
          { model: Director, through: { attributes: [] } },
          { model: Voiceover, through: { attributes: [] } },
        ],
        transaction: t,
      })
      if (foundFilm.actors.length != 0) {
        await this.actorFilmRepository.destroy({ where: { id_film: id_film }, transaction: t })
      }

      if (foundFilm.directors.length != 0) {
        await this.directorFilmRepository.destroy({ where: { id_film: id_film }, transaction: t })
      }

      if (foundFilm.genres.length != 0) {
        await this.genreFilmRepository.destroy({ where: { id_film: id_film }, transaction: t })
      }

      if (foundFilm.voiceovers.length != 0) {
        await this.voiceoverFilmRepository.destroy({ where: { id_film: id_film }, transaction: t })
      }

      const deleteFilm = await this.filmRepository.destroy({ where: { id_film: id_film }, transaction: t })
      if (deleteFilm) {
        await t.commit()
        return { status: true }
      }

      return { status: false }
    } catch (error) {
      await t.rollback()
      throw new Error(error)
    }
  }
  async generateMedia(id_film: number, files: Array<Express.Multer.File>, type: 'trailer' | 'film' | 'preview') {
    try {
      console.log(files)
      for (const file of files) {
        await this.filmRepository.update({ is_processed: 2 }, { where: { id_film: id_film } })
        if (type == 'film' || type == 'trailer') {
          await generateVideo({ path: file.path, id_film, type })
        }
        if (type == 'preview') {
          await this.filmRepository.update(
            { preview_path: `${this.configService.get('API_URL')}/film/image/${id_film}/${file.filename}`, is_processed: 4 },
            { where: { id_film: id_film } },
          )
          return { status: true }
        }
      }

      if (type == 'film') {
        await this.filmRepository.update(
          { film_path: `${this.configService.get('API_URL')}/video/stream/film/${id_film}/${id_film}.m3u8`, is_processed: 4 },
          { where: { id_film: id_film } },
        )
      }
      if (type == 'trailer') {
        await this.filmRepository.update(
          { trailer_path: `${this.configService.get('API_URL')}/video/stream/trailer/${id_film}/${id_film}_360p.m3u8`, is_processed: 4 },
          { where: { id_film: id_film } },
        )
      }
      await this.filmRepository.update({ is_processed: 4 }, { where: { id_film: id_film } })

      return { status: true }
    } catch (error) {
      await this.filmRepository.update({ is_processed: 3 }, { where: { id_film: id_film } })
      throw new Error(error)
    }
  }

  async getHlsFileStream(id: number, type: 'trailer' | 'film', playlist: string) {
    const filePath = `assets/${id}/${type}/${playlist}`

    return await createReadStream(filePath)
  }

  async getActorsFilms(id_film) {
    try {
      const actors = (await this.filmRepository.findOne({ where: { id_film: id_film }, include: { model: Actor, through: { attributes: ['position_role'] } } }))
        .actors

      if (actors) {
        actors.sort((a, b) => {
          const positionA = a.ActorFilm.position_role
          const positionB = b.ActorFilm.position_role
          return positionA - positionB
        })

        return { status: true, data: actors }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
