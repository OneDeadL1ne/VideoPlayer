import { PartialType } from '@nestjs/swagger';
import { CreateVoiceoverDto } from './create-voiceover.dto';

export class UpdateVoiceoverDto extends PartialType(CreateVoiceoverDto) {}
