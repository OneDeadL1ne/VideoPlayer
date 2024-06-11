import {
  Controller,
  UseFilters,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Param,
  Patch,
  Req,
  Delete,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiCreatedResponse, ApiResponse, ApiOkResponse } from '@nestjs/swagger'
import { AppError } from 'src/constants/error'
import { AppStrings } from 'src/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto, UpdateUserStatusDto, UpdateUserSubscriptionDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { StatusUserResponse } from './response'
import { UserService } from './user.service'
import { RoleService } from '../role/role.service'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'node:path'
import * as fs from 'node:fs'

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @ApiOperation({ summary: AppStrings.USER_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.USER_CREATED_RESPONSE,
    type: StatusUserResponse,
  })
  @Post()
  async create(@Body() user: CreateUserDto) {
    const foundUser = await this.usersService.findByEmail(user.email)

    if (foundUser) {
      throw new HttpException(AppError.USER_EMAIL_EXISTS, HttpStatus.CONFLICT)
    }

    const foundRole = await this.roleService.findOne(user.id_role)
    if (!foundRole) {
      throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return this.usersService.create(user).catch((error) => {
      const errorMessage = error.message

      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST)
    })
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get(':id')
  @ApiOperation({ summary: AppStrings.USER_GET_OPERATION })
  @ApiResponse({
    status: 200,
    description: AppStrings.USER_GET_RESPONSE,
    type: User,
  })
  async findById(@Param('id') id: number) {
    return await this.usersService.findById(+id)
  }

  @ApiOperation({ summary: AppStrings.USER_UPDATE_OPERATION })
  @ApiResponse({ status: 200, description: AppStrings.USER_UPDATE_RESPONSE })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() user: UpdateUserDto) {
    const foundUser = await this.usersService.findByEmail(user.email)
    if (!foundUser) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    if (user.id_role) {
      const foundRole = await this.roleService.findOne(user.id_role)
      if (!foundRole) {
        throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND)
      }
    }

    return this.usersService.update(user)
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  @ApiOperation({ summary: AppStrings.USER_DELETE_OPERATION })
  @ApiResponse({
    status: 200,
    description: AppStrings.USER_DELETE_RESPONSE,
    type: User,
  })
  async remove(@Param('id') id: number) {
    const foundUser = await this.usersService.findOne(id)
    if (foundUser == null) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return this.usersService.remove(+id)
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch('change_status')
  @ApiOperation({ summary: AppStrings.USER_DELETE_OPERATION })
  @ApiOkResponse({ type: StatusUserResponse, description: AppStrings.USER_DELETE_RESPONSE })
  async changeStatus(@Body() updateUserStatusDto: UpdateUserStatusDto, @Req() request) {
    if (updateUserStatusDto.id_user == request.user.id_user) {
      throw new HttpException(AppError.USER_SELF_DEACTIVATE, HttpStatus.FORBIDDEN)
    } else {
      const foundUser = await this.usersService.findOne(updateUserStatusDto.id_user)
      if (!foundUser) {
        throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
      }
    }

    return this.usersService.changeStatus(updateUserStatusDto)
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch('change_subscription')
  @ApiOkResponse({ type: StatusUserResponse, description: AppStrings.USER_DELETE_RESPONSE })
  async changeSubscription(@Body() updateUserSubscritionDto: UpdateUserSubscriptionDto) {
    return this.usersService.changeSubscription(updateUserSubscritionDto)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('my/:id')
  async findMyUser(@Param() id, @Req() request) {
    return this.usersService.findById(request.user.id_user)
  }

  @Get('image/:id_user/:image')
  async getImage(@Param('id_user') id_user: number, @Param('image') image: string, @Res() res) {
    return await res.sendFile(image, { root: `./upload/images/users/${id_user}` })
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      fileFilter: (req, file, callback) => {
        if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif|webp|svg)/))) callback(null, false)
        callback(null, true)
      },
      storage: diskStorage({
        destination: (req, file, callback) => {
          let directory = `./upload/images/users`
          if (!fs.existsSync(`${directory}/${req.query.id_user}`)) {
            fs.mkdirSync(`${directory}/${req.query.id_user}`, { recursive: true })
          }

          directory += `/${req.query.id_user}`

          callback(null, `${directory}`)
        },
        filename: (req, file, callback) => {
          let type = 'photo'
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          if (file.originalname == 'blob') {
            type = 'avatar'
          }
          return callback(null, `${req.query.id_user}-${type}-${randomName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  async uploadActorImage(@Query('id_user') id_user: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.usersService.updateAvatarUser(id_user, files)
  }
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch('image')
  async deleteActorImage(@Query('id_user') id_user: number) {
    return await this.usersService.deleteAvatarUser(id_user)
  }
}
