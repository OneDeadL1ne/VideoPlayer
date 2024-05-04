import { Injectable } from '@nestjs/common'
import { Actor } from './entities/actor.entity'
import { InjectModel } from '@nestjs/sequelize'
import { CreateActorDto, UpdateActorDto } from './dto'

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(Actor)
    private actorRepository: typeof Actor,
  ) {}
  async create(createActorDto: CreateActorDto) {
    try {
      const newGenre = await this.actorRepository.create({ ...createActorDto })
      return { status: true, data: newGenre }
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
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id_actor: number) {
    try {
      const deleteActor = await this.actorRepository.destroy({ where: { id_actor: id_actor } })
      if (deleteActor) {
        return { status: true }
      }
      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
