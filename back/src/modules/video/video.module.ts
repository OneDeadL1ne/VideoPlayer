import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { FilmModule } from '../film/film.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { Film } from '../film/entities/film.entity';

@Module({
  imports:[FilmModule, SequelizeModule.forFeature([Film])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
