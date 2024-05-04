import { ApiProperty } from '@nestjs/swagger'

export class CreateVoiceoverDto {
  @ApiProperty()
  voiceover_name?: string
}
export class UpdateVoiceoverDto {
  @ApiProperty()
  id_voiceover?: number

  @ApiProperty()
  voiceover_name?: string
}
