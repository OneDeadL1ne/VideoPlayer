import { ApiProperty } from '@nestjs/swagger'

export class CreateActorDto {
  @ApiProperty()
  last_name: string
  @ApiProperty()
  first_name: string
  @ApiProperty()
  patronymic?: string
}
export class UpdateActorDto {
  @ApiProperty()
  id_actor?: number
  @ApiProperty()
  last_name?: string
  @ApiProperty()
  first_name?: string
  @ApiProperty()
  patronymic?: string
}

export class UpdateImageActorDto {
  @ApiProperty()
  id_actor?: number
  @ApiProperty()
  last_name?: string
  @ApiProperty()
  first_name?: string
  @ApiProperty()
  patronymic?: string
  @ApiProperty()
  photo_url?: string
  @ApiProperty()
  avatar_url?: string
}
