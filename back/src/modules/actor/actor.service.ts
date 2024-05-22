import { Injectable } from '@nestjs/common'
import { Actor } from './entities/actor.entity'
import { InjectModel } from '@nestjs/sequelize'
import { CreateActorDto, UpdateActorDto } from './dto'
import { ConfigService } from '@nestjs/config'
import * as fs from 'node:fs'
@Injectable()
export class ActorService {
  constructor(
    @InjectModel(Actor)
    private actorRepository: typeof Actor,
    private readonly configService: ConfigService,
  ) {}
  async create(createActorDto: CreateActorDto) {
    try {
      const newActor = await this.actorRepository.create({ ...createActorDto })

      return { status: true, data: newActor }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      return await this.actorRepository.findAll({ order: [['id_actor', 'ASC']] })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id_actor: number) {
    try {
      return await this.actorRepository.findOne({ where: { id_actor } })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(updateActorDto: UpdateActorDto) {
    try {
      await this.actorRepository.update({ ...updateActorDto }, { where: { id_actor: updateActorDto.id_actor } })

      const foundActor = await this.actorRepository.findOne({
        where: { id_actor: updateActorDto.id_actor },
      })

      return foundActor
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id_actor: number) {
    try {
      const dir = `./upload/images/actors/${id_actor}`
      const deleteActor = await this.actorRepository.destroy({ where: { id_actor: id_actor } })
      if (deleteActor) {
        if (fs.existsSync(dir)) {
          const images = fs.readdirSync(dir)
          for (const f of images) {
            fs.rmSync(`${dir}/${f}`)
          }
          fs.rmSync(dir, { recursive: true, force: true })
        }
        return { status: true }
      }
      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
  async updateAvatarActor(id_actor: number, files: Array<Express.Multer.File>) {
    try {
      const dir = `./upload/images/actors/${id_actor}`
      let photo
      let avatar

      if (files.length == 2) {
        for (const file of files) {
          if (file.filename.split('.')[1] && file.filename.split('-')[1] == 'photo') {
            await this.actorRepository.update(
              { photo_url: `${this.configService.get('API_URL')}/actor/image/${id_actor}/${file.filename}` },
              { where: { id_actor: id_actor } },
            )
          }

          if (!file.filename.split('.')[1] && file.originalname == 'blob' && file.filename.split('-')[1] == 'avatar') {
            await this.actorRepository.update(
              { avatar_url: `${this.configService.get('API_URL')}/actor/image/${id_actor}/${file.filename}` },
              { where: { id_actor: id_actor } },
            )
          }
        }
        const foundActor = await this.actorRepository.findOne({
          where: { id_actor: id_actor },
        })
        photo = foundActor.photo_url.split('/')[6]
        avatar = foundActor.avatar_url.split('/')[6]
      }
      if (files.length == 1) {
        if (!files[0].filename.split('.')[1] && files[0].originalname == 'blob' && files[0].filename.split('-')[1] == 'avatar') {
          await this.actorRepository.update(
            { avatar_url: `${this.configService.get('API_URL')}/actor/image/${id_actor}/${files[0].filename}` },
            { where: { id_actor: id_actor } },
          )
        }
        const foundActor = await this.actorRepository.findOne({
          where: { id_actor: id_actor },
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

      const foundActor = await this.actorRepository.findOne({
        where: { id_actor: id_actor },
      })

      return { status: true, data: foundActor }
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteAvatarActor(id_actor: number) {
    try {
      const dir = `./upload/images/actors/${id_actor}`

      await this.actorRepository.update({ photo_url: null, avatar_url: null }, { where: { id_actor: id_actor } })

      if (fs.existsSync(dir)) {
        const images = fs.readdirSync(dir)
        for (const f of images) {
          if (f) {
            fs.rmSync(`${dir}/${f}`)
          }
        }
      }

      const foundActor = await this.actorRepository.findOne({
        where: { id_actor: id_actor },
      })

      if (foundActor) {
        return { status: true, data: foundActor }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
