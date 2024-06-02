import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Query, UploadedFiles, UseInterceptors, Res } from '@nestjs/common'
import { FilmService } from './film.service'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CreateFilmDto, UpdateFilmDto } from './dto'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import * as fs from 'node:fs'
@ApiBearerAuth()
@ApiTags('Film')
@Controller('film')
@UseFilters(AllExceptionsFilter)
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  async create(@Body() createFilmDto: CreateFilmDto) {
    return await this.filmService.create(createFilmDto)
  }

  @Get('')
  async findAll(@Query('id_user') id_user: number) {
    if (id_user) {
      return await this.filmService.findAll(id_user)
    }
    return await this.filmService.findAll(0)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.filmService.findOne(+id)
  }

  @Get(':id/actors')
  async findActorsFilm(@Param('id') id: string) {
    return await this.filmService.getActorsFilms(+id)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() updateFilmDto: UpdateFilmDto) {
    return await this.filmService.update(updateFilmDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.filmService.remove(+id)
  }
  @Get('image/:id_film/:image')
  async getImage(@Param('id_film') id_film: number, @Param('image') image: string, @Res() res) {
    return await res.sendFile(image, { root: `./upload/films/${id_film}` })
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      fileFilter: (req, file, callback) => {
        if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif|mp4|webp|video\/x-matroska)/))) callback(null, false)
        callback(null, true)
      },
      storage: diskStorage({
        destination: (req, file, callback) => {
          let directory = './upload/films'
          if (!fs.existsSync(`${directory}/${req.query.id_film}`)) {
            fs.mkdirSync(`${directory}/${req.query.id_film}`, { recursive: true })
          }

          directory += `/${req.query.id_film}`

          callback(null, `${directory}`)
        },
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          return callback(null, `${req.query.type}-${randomName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  async uploadVideo(
    @Query('id_film') id_film: number,
    @Query('type') type: 'trailer' | 'film' | 'preview',
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.filmService.generateMedia(id_film, files, type)
  }
}
