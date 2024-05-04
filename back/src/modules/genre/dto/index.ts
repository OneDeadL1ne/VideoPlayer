import { ApiProperty } from '@nestjs/swagger'

export class CreateGenreDto {
  @ApiProperty()
  genre_name: string
}

export class UpdateGenreDto {
  @ApiProperty({ default: 1 })
  id_genre: number

  @ApiProperty({ required: false })
  genre_name?: string
}
