import { Module } from '@nestjs/common'
import { VoiceoverService } from './voiceover.service'
import { VoiceoverController } from './voiceover.controller'
import { Voiceover } from './entities/voiceover.entity'
import { SequelizeModule } from '@nestjs/sequelize'
import { Person } from '../person/entities/person.entity'
import { PersonModule } from '../person/person.module'
import { User } from '../user/entities/user.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [SequelizeModule.forFeature([Voiceover, User, Person]), UserModule, PersonModule],
  controllers: [VoiceoverController],
  providers: [VoiceoverService],
  exports: [VoiceoverModule],
})
export class VoiceoverModule {}
