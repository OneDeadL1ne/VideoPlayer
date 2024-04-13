import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrailerModule } from '../trailer/trailer.module';
import { TrailerController } from '../trailer/trailer.controller';
import { TrailerService } from '../trailer/trailer.service';
import { UploadvideoController } from '../uploadvideo/uploadvideo.controller';
import { UploadvideoService } from '../uploadvideo/uploadvideo.service';
import { UploadvideoModule } from '../uploadvideo/uploadvideo.module';

@Module({
  imports: [TrailerModule, UploadvideoModule],
  controllers: [AppController, TrailerController,UploadvideoController],
  providers: [AppService, TrailerService, UploadvideoService],
})
export class AppModule {}
