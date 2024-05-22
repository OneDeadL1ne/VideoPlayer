import { ApiProperty } from '@nestjs/swagger'

export class CreateFilmDto {
  @ApiProperty()
  id_film: number

  @ApiProperty()
  film_title: string

  @ApiProperty()
  film_length_seconds: number

  @ApiProperty()
  description: string

  @ApiProperty()
  rating?: number

  @ApiProperty()
  subtitles: boolean

  @ApiProperty()
  release_year?: number

  @ApiProperty()
  release_year_russia?: number

  @ApiProperty()
  is_subscribe: boolean

  @ApiProperty()
  is_deleted: boolean

  @ApiProperty()
  is_processed: number

  @ApiProperty()
  id_age_limit: number

  @ApiProperty({ default: [1, 2, 3] })
  actor_ids: number[]

  @ApiProperty({ default: [1, 2, 3] })
  director_ids: number[]

  @ApiProperty({ default: [1, 2, 3] })
  voiceover_ids: number[]

  @ApiProperty({ default: [1, 2, 3] })
  genre_ids: number[]

  @ApiProperty()
  trailer_path: string

  @ApiProperty()
  film_path: string

  @ApiProperty()
  preview_path: string
}

export class UpdateFilmDto {
  @ApiProperty()
  id_film: number

  @ApiProperty()
  film_title: string

  @ApiProperty()
  film_length_seconds: number

  @ApiProperty()
  description: string

  @ApiProperty()
  rating?: number

  @ApiProperty()
  subtitles: boolean

  @ApiProperty()
  release_year?: number

  @ApiProperty()
  release_year_russia?: number

  @ApiProperty()
  is_subscribe: boolean

  @ApiProperty()
  is_deleted: boolean

  @ApiProperty()
  is_processed: number

  @ApiProperty()
  id_age_limit: number

  @ApiProperty()
  actor_ids: number[]

  @ApiProperty()
  director_ids: number[]

  @ApiProperty()
  voiceover_ids: number[]

  @ApiProperty()
  genre_ids: number[]

  @ApiProperty()
  trailer_path: string

  @ApiProperty()
  film_path: string

  @ApiProperty()
  preview_path: string
}
