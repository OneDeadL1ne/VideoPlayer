import { PartialType } from '@nestjs/swagger';
import { CreateAgelimitDto } from './create-agelimit.dto';

export class UpdateAgelimitDto extends PartialType(CreateAgelimitDto) {}
