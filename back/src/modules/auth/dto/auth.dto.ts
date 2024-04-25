import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @ApiProperty({ default: '1@mail.ru' })
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
