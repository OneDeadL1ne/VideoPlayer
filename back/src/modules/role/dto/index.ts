import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty()
  role_name: string
}
export class UpdateRoleDto {
  @ApiProperty()
  id_role?: number

  @ApiProperty()
  role_name?: string
}
