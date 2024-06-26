import { InjectModel } from '@nestjs/sequelize'
import { User } from '../user/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly configService: ConfigService,
  ) {}

  async updateAvatarUser(id: number, files: Array<Express.Multer.File>) {
    try {
      for (const file of files) {
        await this.userRepository.update(
          { avatar_url: `${this.configService.get('API_URL')}/image/?id_user=${id}&imgpath=${file.filename}` },
          { where: { id_user: id } },
        )
      }
      return { status: true }
    } catch (error) {
      throw new Error(error)
    }
  }
}
