import { Controller, Post, Body, Ip, Req, Delete, HttpException, HttpStatus, UseFilters } from '@nestjs/common'
import { AuthService } from './auth.service'




import { ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { UserService } from '../user/user.service'
import { AuthDto } from './dto/auth.dto'
import { AppError } from 'src/constants/error'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@ApiTags('Auth')
@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Post()
  async login(@Body() authDto: AuthDto, @Ip() ipAddress, @Req() request) {
    const userExists = await this.usersService.findUser({
      email: authDto.email,
    })
    
    if (!userExists) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
    } else if (userExists.is_deleted) {
      throw new HttpException(AppError.USER_DEACTIVATED, HttpStatus.FORBIDDEN)
    }

    return this.authService.login(authDto, {
      userAgent: request.headers['user-agent'],
      ipAddress: ipAddress,
    })
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refresh_token)
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refresh_token)
  }
}
