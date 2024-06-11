import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiProperty({ default: 1 })
  id_user: number

  @ApiProperty({ required: false })
  last_name?: string

  @ApiProperty({ required: false })
  first_name?: string

  @ApiProperty({ required: false })
  patronymic?: string

  @ApiProperty({ required: false })
  phone?: string

  id_person?: number

  @ApiProperty({ default: 1, required: false })
  id_role?: number

  @ApiProperty({ required: false })
  nickname: string

  @ApiProperty({ required: false })
  email?: string

  @ApiProperty({ required: false })
  password?: string
}

export class UpdateUserStatusDto {
  @ApiProperty({ default: 1 })
  id_user: number

  @ApiProperty({ default: false })
  is_deleted: boolean
}

export class UpdateUserSubscriptionDto {
  @ApiProperty({ default: 1 })
  id_user: number

  @ApiProperty({ default: false })
  is_subscription: boolean
}
