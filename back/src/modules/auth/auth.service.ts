import { HttpException, HttpStatus, Injectable } from '@nestjs/common'


import * as bcrypt from 'bcrypt'

import { InjectModel } from '@nestjs/sequelize'
import { Auth } from './entities/auth.entity'
import { sign, verify } from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'

import { AuthResponse } from './response'
import { CreateAuthDto } from './dto/create-auth.dto'
import { AuthDto } from './dto/auth.dto'
import { UserService } from '../user/user.service'
import { AppError } from 'src/constants/error'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth) private authRepository: typeof Auth,
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const newAuth = await this.authRepository.create(createAuthDto)

      return newAuth
    } catch (error) {
      throw new Error(error)
    }
  }

  async login(auth: AuthDto, values: { userAgent: string; ipAddress: string }) {
    const loginData = await this.usersService.findByEmail(auth.email)

    if (await bcrypt.compare(auth.password, loginData.password)) {
      delete loginData['password']
      return this.newRefreshAndAccessToken(loginData, values)
    } else {
      throw new HttpException(AppError.WRONG_CREDENTIALS, HttpStatus.FORBIDDEN)
    }
  }

  private async newRefreshAndAccessToken(loginData: any, values: { userAgent: string; ipAddress: string }): Promise<AuthResponse> {
    const authObject = new CreateAuthDto()
    authObject.id_user = loginData.id_user
    authObject.user_agent = values.userAgent
    authObject.ip_address = values.ipAddress

    const auth = await this.create(authObject)

    const authJson = {
      refreshToken: auth.sign(),
      accessToken: sign(
        {
          ...loginData,
        },
        this.configService.get('access_secret'),
        {
          expiresIn: '12h',
        },
      ),
    }

    return authJson
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr)
    if (!refreshToken) {
      throw new HttpException(AppError.INVALID_JWT, HttpStatus.FORBIDDEN)
    }

    const user = await this.usersService.findById(refreshToken.id_user)

    if (!user) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    const loginData = await this.usersService.findByEmail(user.email)
    delete loginData['password']

    const accessToken = {
      ...loginData,
    }

    return sign(accessToken, this.configService.get('access_secret'), {
      expiresIn: '12h',
    })
  }

  private async retrieveRefreshToken(refreshStr: string): Promise<Auth | undefined> {
    try {
      const decoded = verify(refreshStr, this.configService.get('refresh_token'))
      if (typeof decoded === 'string') {
        return undefined
      }

      const id_auth = decoded.dataValues.id_auth
      return await this.authRepository.findOne({ where: { id_auth } })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr)

    if (!refreshToken) {
      return
    }

    const id_auth = refreshToken.id_auth

    const foundAuth = await this.authRepository.findOne({ where: { id_auth } })
    if (!foundAuth) {
      throw new HttpException(AppError.INVALID_JWT, HttpStatus.FORBIDDEN)
    }

    await this.authRepository.destroy({ where: { id_auth } })
  }
}
