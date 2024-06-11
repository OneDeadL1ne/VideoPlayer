import { ApiProperty } from '@nestjs/swagger'
import { NonAttribute } from 'sequelize'
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { AppStrings } from 'src/constants/strings'
import { Person } from 'src/modules/person/entities/person.entity'
import { Post } from 'src/modules/post/entities/post.entity'

import { Role } from 'src/modules/role/entities/role.entity'

@Table({ tableName: 'User', timestamps: false })
export class User extends Model {
  @PrimaryKey
  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  id_user: number

  @ForeignKey(() => Person)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_person: number

  @BelongsTo(() => Person)
  person: NonAttribute<Person>

  @ApiProperty({ example: AppStrings.USER_EMAIL_EXAMPLE, description: AppStrings.USER_EMAIL_DESCRIPTION })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string

  @ApiProperty()
  @Column({ type: DataType.STRING(50), allowNull: false })
  nickname: string

  @ApiProperty()
  @Column({ type: DataType.STRING(250), allowNull: true })
  photo_url?: string

  @ApiProperty()
  @Column({ type: DataType.STRING(250), allowNull: true })
  avatar_url?: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_subscription: boolean

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_deleted: boolean

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_role: number

  @BelongsTo(() => Role)
  role: NonAttribute<Role>

  @BelongsToMany(() => Post, () => UserPost)
  reactions: Array<Post & { UserPost: UserPost }>
}

@Table({ tableName: 'UserPost', timestamps: false })
export class UserPost extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_user: number

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_post: number

  @ForeignKey(() => Reaction)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_reaction: number

  @BelongsTo(() => Reaction)
  role: NonAttribute<Reaction>
}

@Table({ tableName: 'Reaction', timestamps: false })
export class Reaction extends Model {
  @PrimaryKey
  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  id_reaction: number

  @ApiProperty()
  @Column({ type: DataType.STRING(50), allowNull: false })
  reaction_name: 'Like' | 'Dislike'

  @ApiProperty()
  @Column({ type: DataType.INTEGER, allowNull: false })
  reaction_value: number

  @HasMany(() => UserPost)
  users: NonAttribute<UserPost[]>
}
