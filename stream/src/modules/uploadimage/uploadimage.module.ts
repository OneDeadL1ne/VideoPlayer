import { Module } from '@nestjs/common';
import { UploadimageService } from './uploadimage.service';
import { UploadimageController } from './uploadimage.controller';

@Module({
  controllers: [UploadimageController],
  providers: [UploadimageService],
})
export class UploadimageModule {}
