import { Module } from '@nestjs/common';
import { AgelimitService } from './agelimit.service';
import { AgelimitController } from './agelimit.controller';

@Module({
  controllers: [AgelimitController],
  providers: [AgelimitService],
})
export class AgelimitModule {}
