import { ApiProperty } from '@nestjs/swagger'
import { Table, Model, BelongsToMany, ForeignKey, Column, PrimaryKey, DataType, BelongsTo } from 'sequelize-typescript'
import { AppStrings } from 'src/constants/strings'
import { Actor, ActorFilm } from 'src/modules/actor/entities/actor.entity'
import { Agelimit } from 'src/modules/agelimit/entities/agelimit.entity'
import { Director, DirectorFilm } from 'src/modules/director/entities/director.entity'
import { Genre, GenreFilm } from 'src/modules/genre/entities/genre.entity'

import { Voiceover, VoiceoverFilm } from 'src/modules/voiceover/entities/voiceover.entity'

@Table({ tableName: 'Film', timestamps: false })
export class Film extends Model {
  @PrimaryKey
  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  id_film: number

  @ApiProperty()
  @Column({ type: DataType.STRING(50), allowNull: false })
  film_title: string

  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: false })
  film_length_seconds: number

  @ApiProperty()
  @Column({ type: DataType.STRING(2000), allowNull: false })
  description: string

  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 0.0 })
  rating?: number

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  subtitles: boolean

  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: true })
  release_year?: number
  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: true })
  release_year_russia?: number

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  is_subscribe: boolean

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  is_deleted: boolean

  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 1 })
  is_processed: number

  @ForeignKey(() => Agelimit)
  @Column
  id_age_limit: number

  @BelongsTo(() => Agelimit)
  age_limit: Agelimit

  @ApiProperty({
    type: () => Actor,
    description: AppStrings.ACTOR,
  })
  @BelongsToMany(() => Actor, () => ActorFilm)
  actors: Array<Actor & { ActorFilm: ActorFilm }>

  @ApiProperty({
    type: () => Director,
    description: AppStrings.DIRECTOR,
  })
  @BelongsToMany(() => Director, () => DirectorFilm)
  directors: Array<Director & { DirectorFilm: DirectorFilm }>

  @ApiProperty({
    type: () => Voiceover,
    description: AppStrings.VOICEOVER,
  })
  @BelongsToMany(() => Voiceover, () => VoiceoverFilm)
  voiceovers: Array<Voiceover & { VoiceoverFilm: VoiceoverFilm }>

  @ApiProperty({
    type: () => Genre,
    description: AppStrings.GENRE,
  })
  @BelongsToMany(() => Genre, () => GenreFilm)
  genres: Array<Genre & { GenreFilm: GenreFilm }>

  @ApiProperty()
  @Column({ type: DataType.STRING(250), allowNull: true })
  trailer_path: string

  @ApiProperty()
  @Column({ type: DataType.STRING(250), allowNull: true })
  film_path: string

  @ApiProperty()
  @Column({ type: DataType.STRING(250), allowNull: true })
  preview_path: string
}
