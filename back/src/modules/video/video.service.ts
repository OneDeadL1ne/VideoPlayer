import { HttpException, Injectable } from '@nestjs/common'
import { Film } from '../film/entities/film.entity'
import { InjectModel } from '@nestjs/sequelize'
import { generateVideo } from 'src/common/utils/generateVideo'
import { createReadStream } from 'node:fs'

@Injectable()
export class VideoService {
  constructor(@InjectModel(Film) private filmRepository: typeof Film) {}

  async generateMedia(id_film: number, files: Array<Express.Multer.File>, type: 'trailer' | 'film') {
    try {
      for (const file of files) {
        await generateVideo({ path: file.path, id_film, type })
      }
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
  getHlsFileStream(id: number, type: 'trailer' | 'film', playlist: string) {
    const filePath = `assets/${id}/${type}/${playlist}`

    return createReadStream(filePath)
  }
}