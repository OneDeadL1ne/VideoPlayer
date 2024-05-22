import { Module } from '@nestjs/common'
import { FilmService } from './film.service'
import { FilmController } from './film.controller'
import { SequelizeModule } from '@nestjs/sequelize'

import { User } from '../user/entities/user.entity'
import { UserModule } from '../user/user.module'
import { Film } from './entities/film.entity'

import { VoiceoverModule } from '../voiceover/voiceover.module'
import { GenreModule } from '../genre/genre.module'
import { DirectorModule } from '../director/director.module'
import { ActorFilm } from '../actor/entities/actor.entity'
import { DirectorFilm } from '../director/entities/director.entity'
import { VoiceoverFilm } from '../voiceover/entities/voiceover.entity'
import { GenreFilm } from '../genre/entities/genre.entity'
import { Agelimit } from '../agelimit/entities/agelimit.entity'
import { AgelimitModule } from '../agelimit/agelimit.module'

@Module({
  imports: [
    SequelizeModule.forFeature([Film, User, ActorFilm, DirectorFilm, VoiceoverFilm, GenreFilm, Agelimit]),
    UserModule,
    VoiceoverModule,
    GenreModule,
    DirectorModule,
    AgelimitModule,
  ],
  controllers: [FilmController],
  providers: [FilmService],
  exports: [FilmService],
})
export class FilmModule {}
