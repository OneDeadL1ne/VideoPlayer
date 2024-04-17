import { Module } from '@nestjs/common';
import { VoiceoverService } from './voiceover.service';
import { VoiceoverController } from './voiceover.controller';

@Module({
  controllers: [VoiceoverController],
  providers: [VoiceoverService],
})
export class VoiceoverModule {}
