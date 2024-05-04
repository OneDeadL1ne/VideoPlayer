import { ApiProperty } from '@nestjs/swagger'

export class CreateGenderDto {
  @ApiProperty()
  gender_name: string
}
export class UpdateGenderDto {
  @ApiProperty()
  id_gender?: number

  @ApiProperty()
  gender_name?: string
}
