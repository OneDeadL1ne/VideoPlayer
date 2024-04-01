import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloDTO } from '../../dto/helloDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  async postHello(@Body() body:HelloDTO){
    return this.appService.postHello(body.hello);
  }
}
