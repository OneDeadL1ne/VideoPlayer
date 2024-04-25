import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty({ required: false })
    last_name: string
  
    @ApiProperty({ required: false })
    first_name: string
  
    @ApiProperty({ required: false })
    patronymic?: string
  
    @ApiProperty({ required: false })
    phone: string
  
    id_person: number
  
    @ApiProperty({ default: 1 })
    id_role: number
  
    @ApiProperty()
    email: string
  
    @ApiProperty()
    password: string

    @ApiProperty({ default: '1' })
    id_gender: number


  
  }
  
 