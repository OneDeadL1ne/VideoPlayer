import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsNumber()
  @ApiProperty()
  id_user: number;

  @IsString()
  @ApiProperty()
  user_agent: string;

  @IsString()
  @ApiProperty()
  ip_address: string;
}
