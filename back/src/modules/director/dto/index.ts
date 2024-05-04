import { ApiProperty } from '@nestjs/swagger'

export class CreateDirectorDto {
  @ApiProperty()
  last_name: string

  @ApiProperty()
  first_name: string

  @ApiProperty()
  patronymic?: string
}

export class UpdateDirectorDto {
  @ApiProperty()
  id_director?: number

  @ApiProperty()
  last_name?: string

  @ApiProperty()
  first_name?: string

  @ApiProperty()
  patronymic?: string
}
