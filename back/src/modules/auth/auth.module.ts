import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    SequelizeModule.forFeature([Auth]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
