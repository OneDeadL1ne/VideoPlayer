import { Module } from '@nestjs/common';
import { UploadvideoService } from './uploadvideo.service';
import { UploadvideoController } from './uploadvideo.controller';

@Module({
  controllers: [UploadvideoController],
  providers: [UploadvideoService],
})
export class UploadvideoModule {}
