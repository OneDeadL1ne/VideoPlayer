import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsPhoneNumber, IsString, IsEmail, IsOptional, IsArray } from 'class-validator'

export class UserResponse {
  @IsInt()
  @ApiProperty({ required: false })
  id_user?: number

  @IsString()
  @ApiProperty({ required: false })
  first_name?: string

  @IsString()
  @ApiProperty({ required: false })
  patronymic?: string

  @IsPhoneNumber()
  @ApiProperty({ required: false })
  phone?: string

  @IsInt()
  @ApiProperty({ default: 1, required: false })
  id_person?: number

  @IsInt()
  @ApiProperty({ default: 1 })
  id_role: number

  
  
  @ApiProperty({ default: true })
  is_deleted: boolean

  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  password: string

}

export class ArrayUserResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: UserResponse, isArray: true })
  data: UserResponse[]
}

export class StatusUserResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: UserResponse
}
