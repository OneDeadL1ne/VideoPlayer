import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService: ConfigService = app.get<ConfigService>(ConfigService)
  const port = configService.get('APP_PORT')
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost',
      'https://localhost',
      'https://766qc35g-3000.euw.devtunnels.ms',
      'https://766qc35g-3000.euw.devtunnels.ms/',
      'http://89.169.53.46/',
      'http://89.169.53.46/',
      'http://amoments.ru/',
      'https://amoments.ru/',
      'http://amoments.ru',
      'https://amoments.ru',
    ],
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
  const config = new DocumentBuilder()
    .setTitle('amoments')

    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(port)
}
bootstrap()
