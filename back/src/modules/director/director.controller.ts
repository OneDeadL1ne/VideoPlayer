import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Query, Res, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { DirectorService } from './director.service'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreateDirectorDto, UpdateDirectorDto } from './dto'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'node:path'
import * as fs from 'node:fs'

@ApiBearerAuth()
@ApiTags('Director')
@UseFilters(AllExceptionsFilter)
@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  async create(@Body() createDirectorDto: CreateDirectorDto) {
    return await this.directorService.create(createDirectorDto)
  }

  @Get()
  async findAll() {
    return await this.directorService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.directorService.findOne(+id)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() updateDirectorDto: UpdateDirectorDto) {
    return await this.directorService.update(updateDirectorDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.directorService.remove(+id)
  }

  @Get('image/:id_director/:image')
  async getImage(@Param('id_director') id_director: number, @Param('image') image: string, @Res() res) {
    return await res.sendFile(image, { root: `./upload/images/directors/${id_director}` })
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      fileFilter: (req, file, callback) => {
        if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif|webp|svg)/))) callback(null, false)
        callback(null, true)
      },
      storage: diskStorage({
        destination: (req, file, callback) => {
          let directory = `./upload/images/directors`
          if (!fs.existsSync(`${directory}/${req.query.id_director}`)) {
            fs.mkdirSync(`${directory}/${req.query.id_director}`, { recursive: true })
          }

          directory += `/${req.query.id_director}`

          callback(null, `${directory}`)
        },
        filename: (req, file, callback) => {
          let type = 'photo'
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          if (file.originalname == 'blob') {
            type = 'avatar'
          }
          return callback(null, `${req.query.id_director}-${type}-${randomName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  async uploadActorImage(@Query('id_director') id_director: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.directorService.updateAvatarDirector(id_director, files)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch('image')
  async deleteActorImage(@Query('id_director') id_director: number) {
    return await this.directorService.deleteAvatarDirector(id_director)
  }
}
