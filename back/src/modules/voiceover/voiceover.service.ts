import { Injectable } from '@nestjs/common'
import { CreateVoiceoverDto, UpdateVoiceoverDto } from './dto'
import { Voiceover } from './entities/voiceover.entity'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class VoiceoverService {
  constructor(@InjectModel(Voiceover) private genreRepository: typeof Voiceover) {}
  async create(createVoiceoverDto: CreateVoiceoverDto) {
    try {
      const newVoice = await this.genreRepository.create({ ...createVoiceoverDto })

      return { status: true, data: newVoice }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      return await this.genreRepository.findAll({ order: [['id_voiceover', 'ASC']] })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id_voiceover: number) {
    try {
      return await this.genreRepository.findOne({ where: { id_voiceover } })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(updateVoiceoverDto: UpdateVoiceoverDto) {
    try {
      await this.genreRepository.update({ ...updateVoiceoverDto }, { where: { id_voiceover: updateVoiceoverDto.id_voiceover } })

      const foundVoice = await this.genreRepository.findOne({ where: { id_voiceover: updateVoiceoverDto.id_voiceover } })

      return foundVoice
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id_voiceover: number) {
    try {
      const deleteVoice = await this.genreRepository.destroy({ where: { id_voiceover: id_voiceover } })
      if (deleteVoice) {
        return { status: true }
      }
      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
