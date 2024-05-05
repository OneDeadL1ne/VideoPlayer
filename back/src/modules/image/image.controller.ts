import { Controller, Get, Post, Query, Res, UploadedFiles, UseFilters, UseInterceptors } from '@nestjs/common'
import { ImageService } from './image.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

import { extname } from 'path'
import * as fs from 'node:fs'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Image')
@Controller('image')
@UseFilters(AllExceptionsFilter)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      fileFilter: (req, file, callback) => {
        if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif|webp|svg)/))) callback(null, false)
        callback(null, true)
      },
      storage: diskStorage({
        destination: (req, file, callback) => {
          let directory = './upload/images'
          if (!fs.existsSync(`${directory}/${req.query.id}`)) {
            fs.mkdir(`${directory}/${req.query.id}`, (err) => {
              if (err) throw err // не удалось создать папки
            })
          }

          directory += `/${req.query.id}`

          callback(null, `${directory}`)
        },
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          return callback(null, `${req.query.id}-${randomName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  uploadUserImage(@Query('id') id: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.imageService.updateAvatarUser(id, files)
  }

  @Get()
  async getImage(@Query('id_user') id_user, @Query('imgpath') image, @Res() res) {
    return await res.sendFile(image, { root: `./upload/images/${id_user}` })
  }
}
