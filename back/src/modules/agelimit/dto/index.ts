import { ApiProperty } from '@nestjs/swagger'

export class CreateAgelimitDto {
  @ApiProperty()
  age_limit_name: number
}

export class UpdateAgelimitDto {
  @ApiProperty()
  id_age_limit?: number

  @ApiProperty()
  age_limit_name?: number
}
