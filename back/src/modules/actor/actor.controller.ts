import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters, Query, Res, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { ActorService } from './actor.service'
import { CreateActorDto, UpdateActorDto } from './dto'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'node:path'
import * as fs from 'node:fs'

@ApiBearerAuth()
@ApiTags('Actor')
@Controller('actor')
@UseFilters(AllExceptionsFilter)
export class ActorController {
  constructor(private readonly actorService: ActorService) {}
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  async create(@Body() createActorDto: CreateActorDto) {
    return await this.actorService.create(createActorDto)
  }

  @Get()
  async findAll() {
    return await this.actorService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.actorService.findOne(+id)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() updateActorDto: UpdateActorDto) {
    return await this.actorService.update(updateActorDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.actorService.remove(+id)
  }

  @Get('image/:id_actor/:image')
  async getImage(@Param('id_actor') id_actor: number, @Param('image') image: string, @Res() res) {
    return await res.sendFile(image, { root: `./upload/images/actors/${id_actor}` })
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
          let directory = `./upload/images/actors`
          if (!fs.existsSync(`${directory}/${req.query.id_actor}`)) {
            fs.mkdirSync(`${directory}/${req.query.id_actor}`, { recursive: true })
          }

          directory += `/${req.query.id_actor}`

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
          return callback(null, `${req.query.id_actor}-${type}-${randomName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  async uploadActorImage(@Query('id_actor') id_actor: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.actorService.updateAvatarActor(id_actor, files)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch('image')
  async deleteActorImage(@Query('id_actor') id_actor: number) {
    return await this.actorService.deleteAvatarActor(id_actor)
  }
}
