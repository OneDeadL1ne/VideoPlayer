import { Injectable } from '@nestjs/common'
import { CreateDirectorDto, UpdateDirectorDto } from './dto'
import { Director } from './entities/director.entity'
import { InjectModel } from '@nestjs/sequelize'
import * as fs from 'node:fs'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director)
    private directorRepository: typeof Director,
    private readonly configService: ConfigService,
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
  async updateAvatarDirector(id_director: number, files: Array<Express.Multer.File>) {
    try {
      const dir = `./upload/images/directors/${id_director}`
      let photo
      let avatar
      console.log(files)
      if (files.length == 2) {
        for (const file of files) {
          if (file.filename.split('.')[1] && file.filename.split('-')[1] == 'photo') {
            await this.directorRepository.update(
              { photo_url: `${this.configService.get('API_URL')}/director/image/${id_director}/${file.filename}` },
              { where: { id_director: id_director } },
            )
          }

          if (!file.filename.split('.')[1] && file.originalname == 'blob' && file.filename.split('-')[1] == 'avatar') {
            await this.directorRepository.update(
              { avatar_url: `${this.configService.get('API_URL')}/director/image/${id_director}/${file.filename}` },
              { where: { id_director: id_director } },
            )
          }
        }
        const foundActor = await this.directorRepository.findOne({
          where: { id_director: id_director },
        })
        photo = foundActor.photo_url.split('/')[6]
        avatar = foundActor.avatar_url.split('/')[6]
      }
      if (files.length == 1) {
        if (!files[0].filename.split('.')[1] && files[0].originalname == 'blob' && files[0].filename.split('-')[1] == 'avatar') {
          await this.directorRepository.update(
            { avatar_url: `${this.configService.get('API_URL')}/director/image/${id_director}/${files[0].filename}` },
            { where: { id_director: id_director } },
          )
        }
        const foundActor = await this.directorRepository.findOne({
          where: { id_director: id_director },
        })
        photo = foundActor.photo_url.split('/')[6]
        avatar = foundActor.avatar_url.split('/')[6]
      }

      if (fs.existsSync(dir)) {
        const images = fs.readdirSync(dir)
        for (const f of images) {
          if (f != photo && f != avatar) {
            fs.rmSync(`${dir}/${f}`)
          }
        }
      }

      const foundDirector = await this.directorRepository.findOne({
        where: { id_director: id_director },
      })

      return { status: true, data: foundDirector }
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteAvatarDirector(id_director: number) {
    try {
      const dir = `./upload/images/directors/${id_director}`

      await this.directorRepository.update({ photo_url: null, avatar_url: null }, { where: { id_director: id_director } })

      if (fs.existsSync(dir)) {
        const images = fs.readdirSync(dir)
        for (const f of images) {
          if (f) {
            fs.rmSync(`${dir}/${f}`)
          }
        }
      }

      const foundDirector = await this.directorRepository.findOne({
        where: { id_director: id_director },
      })

      if (foundDirector) {
        return { status: true, data: foundDirector }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
