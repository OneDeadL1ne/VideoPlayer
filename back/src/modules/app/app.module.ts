import { Module } from '@nestjs/common'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import configuration from 'src/config/configuration'
import { GenderModule } from '../gender/gender.module'
import { PersonModule } from '../person/person.module'
import { Person } from '../person/entities/person.entity'
import { Gender } from '../gender/entities/gender.entity'
import { Actor, ActorFilm } from '../actor/entities/actor.entity'
import { Voiceover, VoiceoverFilm } from '../voiceover/entities/voiceover.entity'
import { Genre, GenreFilm } from '../genre/entities/genre.entity'
import { Agelimit } from '../agelimit/entities/agelimit.entity'
import { Director, DirectorFilm } from '../director/entities/director.entity'
import { Film } from '../film/entities/film.entity'
import { ActorModule } from '../actor/actor.module'
import { VoiceoverModule } from '../voiceover/voiceover.module'
import { GenreModule } from '../genre/genre.module'
import { AgelimitModule } from '../agelimit/agelimit.module'
import { DirectorModule } from '../director/director.module'
import { FilmModule } from '../film/film.module'
import { Role } from '../role/entities/role.entity'
import { Reaction, User, UserPost } from '../user/entities/user.entity'
import { RoleModule } from '../role/role.module'
import { UserModule } from '../user/user.module'
import { Auth } from '../auth/entities/auth.entity'
import { AuthModule } from '../auth/auth.module'
import { Post } from '../post/entities/post.entity'
import { PostModule } from '../post/post.module'

import { ResourceModule } from '../resource/resource.module'
import { VideoModule } from '../video/video.module'
import { ImageModule } from '../image/image.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        username: configService.get('db_username'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        sync: { alter: true },
        logging: true,
        models: [
          Gender,
          Person,
          Role,
          Actor,
          Voiceover,
          Genre,
          Agelimit,
          Director,
          Film,
          ActorFilm,
          VoiceoverFilm,
          GenreFilm,
          DirectorFilm,
          Post,
          User,
          Auth,
          Reaction,
          UserPost,
        ],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ImageModule,
    GenderModule,
    PersonModule,
    RoleModule,
    UserModule,
    AuthModule,
    ActorModule,
    VoiceoverModule,
    GenreModule,
    AgelimitModule,
    DirectorModule,
    FilmModule,
    PostModule,
    ResourceModule,
    VideoModule,
  ],
})
export class AppModule {}
