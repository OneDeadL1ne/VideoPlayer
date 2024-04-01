import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrailerModule } from '../trailer/trailer.module';
import { TrailerController } from '../trailer/trailer.controller';
import { TrailerService } from '../trailer/trailer.service';

@Module({
  imports: [TrailerModule],
  controllers: [AppController, TrailerController],
  providers: [AppService, TrailerService],
})
export class AppModule {}
