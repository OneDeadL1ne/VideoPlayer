import { PartialType } from '@nestjs/swagger';
import { CreateUploadvideoDto } from './create-uploadvideo.dto';

export class UpdateUploadvideoDto extends PartialType(CreateUploadvideoDto) {}
