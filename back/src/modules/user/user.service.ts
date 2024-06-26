import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'

import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/sequelize'
import { Person } from 'src/modules/person/entities/person.entity'
import { CreatePersonDto } from 'src/modules/person/dto'

import { Sequelize } from 'sequelize-typescript'

import { Op } from 'sequelize'
import * as fs from 'node:fs'

import { CreateUserDto } from './dto/create-user.dto'
import { AppError } from 'src/constants/error'
import { UpdateUserDto, UpdateUserStatusDto, UpdateUserSubscriptionDto } from './dto/update-user.dto'
import { Role } from '../role/entities/role.entity'
import { StatusUserResponse, UserResponse } from './response'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Person) private personRepository: typeof Person,
    private readonly configService: ConfigService,
    private sequelize: Sequelize,
  ) {}

  async create(user: CreateUserDto): Promise<StatusUserResponse> {
    const transaction = await this.sequelize.transaction()
    try {
      const email = user.email.toLowerCase()
      user.email = email
      user.password = await bcrypt.hash(user.password, 10)

      if (user.last_name && user.first_name && user.phone && user.id_gender) {
        const createPersonDto = new CreatePersonDto()
        createPersonDto.last_name = user.last_name
        createPersonDto.first_name = user.first_name
        createPersonDto.patronymic = user.patronymic
        createPersonDto.phone = user.phone
        createPersonDto.id_gender = user.id_gender
        const newPerson = await this.personRepository.create({ ...createPersonDto }, { transaction: transaction })

        user.id_person = newPerson.id_person
      }

      const newUser = await this.userRepository.create({ ...user }, { transaction: transaction }).catch(async (error) => {
        let errorMessage = error.message
        let errorCode = HttpStatus.BAD_REQUEST
        if (error.original.code === '23505') {
          errorMessage = AppError.USER_EMAIL_EXISTS
          errorCode = HttpStatus.CONFLICT
        }
        await transaction.rollback()
        throw new HttpException(errorMessage, errorCode)
      })

      if (newUser) {
        transaction.commit()
        return {
          status: true,
          data: {
            id_user: newUser.id_user,
            ...user,
            is_deleted: false,
          },
        }
      }
    } catch (error) {
      await transaction.rollback()
      if (error.code === 409) {
        throw new Error(error.message)
      } else {
        throw new Error(error)
      }
    }
  }

  async update(updatedUser: UpdateUserDto) {
    const transaction = await this.sequelize.transaction()
    try {
      if (updatedUser.email != undefined) {
        const email = updatedUser.email.toLowerCase()
        updatedUser.email = email
      }

      if (updatedUser.password != undefined) {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
      }

      const user = await this.findById(updatedUser.id_user)

      const personalData = await this.personRepository.findByPk(user.person.id_person)

      if (!personalData) {
        await transaction.rollback()
        throw new HttpException(AppError.PERSON_NOT_FOUND, HttpStatus.BAD_REQUEST)
      }

      if (updatedUser.first_name) {
        personalData.first_name = updatedUser.first_name
      }
      if (updatedUser.last_name) {
        personalData.last_name = updatedUser.last_name
      }
      if (updatedUser.patronymic) {
        personalData.patronymic = updatedUser.patronymic
      }

      await personalData.save({ transaction: transaction })

      let foundUser = null

      if (updatedUser.nickname) {
        user.nickname = updatedUser.nickname
        await user.save({ transaction: transaction })
      }
      transaction.commit()
      foundUser = await this.userRepository.findOne({
        where: { id_user: updatedUser.id_user },
      })

      return foundUser
    } catch (error) {
      await transaction.rollback()
      throw new Error(error)
    }
  }

  async findOne(id_user: number): Promise<boolean> {
    try {
      const result = await this.userRepository.findOne({ where: { id_user } })

      if (result) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findById(id: number) {
    try {
      const result = await this.userRepository.findOne({
        include: [Role, Person],
        where: { id_user: id },
        attributes: {
          exclude: ['password', 'id_role', 'id_person'],
        },
      })

      if (result != null) {
        return result
      } else {
        return Promise.reject({
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.USER_NOT_FOUND,
        })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findUser({ id_user = -1, email = '' }: { id_user?: number; email?: string }): Promise<UserResponse> {
    try {
      const foundUser = await this.userRepository.findOne({
        where: { [Op.or]: [{ id_user }, { email }] },
      })

      if (foundUser) {
        return foundUser
      } else {
        return null
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const result = await this.userRepository.findOne({
        include: [Person],
        where: { email },
        attributes: { exclude: ['person_id'] },
      })

      if (result != null) {
        // const userRoles = await this.rolePermissionRepository.findAll({
        //   where: { role_id: result.role_id },
        //   attributes: {
        //     exclude: [
        //       'role_permission_id',
        //       'role_id',
        //       'createdAt',
        //       'updatedAt',
        //     ],
        //   },
        // });
        // const permissions = [];
        // userRoles.forEach(element => {
        //     permissions.push(element.dataValues);
        // });

        return {
          id_user: result.id_user,
          email: result.email,
          password: result.password,
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id: number): Promise<StatusUserResponse> {
    const transaction = await this.sequelize.transaction()
    try {
      const user = await this.userRepository.findOne({
        where: { id_user: id },
        attributes: { exclude: ['password'] },
      })

      const deleteUser = await this.userRepository.destroy({
        where: { id_user: id },
        transaction: transaction,
      })
      let deleteData = null
      if (user.id_person) {
        deleteData = await this.personRepository.destroy({
          where: { person_id: user.id_person },
          transaction: transaction,
        })
      }

      if (deleteUser && deleteData) {
        await transaction.commit()

        return { status: true }
      } else {
        await transaction.rollback()
        return { status: false }
      }
    } catch (error) {
      await transaction.rollback()
      throw new Error(error)
    }
  }

  async changeStatus(updateUserStatusDto: UpdateUserStatusDto): Promise<StatusUserResponse> {
    try {
      await this.userRepository.update({ is_deleted: updateUserStatusDto.is_deleted }, { where: { id_user: updateUserStatusDto.id_user } })
      return { status: true }
    } catch (error) {
      throw new Error(error)
    }
  }

  async changeSubscription(updateUserSubscritionDto: UpdateUserSubscriptionDto): Promise<StatusUserResponse> {
    try {
      const res = await this.userRepository.update(
        { is_subscription: updateUserSubscritionDto.is_subscription },
        { where: { id_user: updateUserSubscritionDto.id_user } },
      )
      console.log(res)
      if (res) {
        return { status: true }
      }
      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
  async canUserActivate(id_user: number): Promise<boolean> {
    try {
      const user = await this.findById(id_user)

      if (!user.is_deleted) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateAvatarUser(id_user: number, files: Array<Express.Multer.File>) {
    try {
      // const dir = `./upload/images/users/${id_user}`
      // let photo
      // let avatar

      if (files.length == 2) {
        for (const file of files) {
          if (file.filename.split('.')[1] && file.filename.split('-')[1] == 'photo') {
            await this.userRepository.update(
              { photo_url: `${this.configService.get('API_URL')}/user/image/${id_user}/${file.filename}` },
              { where: { id_user: id_user } },
            )
          }

          if (!file.filename.split('.')[1] && file.originalname == 'blob' && file.filename.split('-')[1] == 'avatar') {
            await this.userRepository.update(
              { avatar_url: `${this.configService.get('API_URL')}/user/image/${id_user}/${file.filename}` },
              { where: { id_user: id_user } },
            )
          }
        }

        // photo = foundActor.photo_url.split('/')[6]
        // avatar = foundActor.avatar_url.split('/')[6]
      }
      if (files.length == 1) {
        if (!files[0].filename.split('.')[1] && files[0].originalname == 'blob' && files[0].filename.split('-')[1] == 'avatar') {
          await this.userRepository.update(
            { avatar_url: `${this.configService.get('API_URL')}/user/image/${id_user}/${files[0].filename}` },
            { where: { id_user: id_user } },
          )
        }

        // photo = foundActor.photo_url.split('/')[6]
        // avatar = foundActor.avatar_url.split('/')[6]
      }

      // if (fs.existsSync(dir)) {
      //   const images = fs.readdirSync(dir)
      //   for (const f of images) {
      //     if (f != photo && f != avatar) {
      //       fs.rmSync(`${dir}/${f}`)
      //     }
      //   }
      // }

      const foundUser = await this.userRepository.findOne({
        where: { id_user: id_user },
      })

      return { status: true, data: foundUser }
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteAvatarUser(id_user: number) {
    try {
      const dir = `./upload/images/users/${id_user}`

      await this.userRepository.update({ photo_url: null, avatar_url: null }, { where: { id_user: id_user } })

      if (fs.existsSync(dir)) {
        const images = fs.readdirSync(dir)
        for (const f of images) {
          if (f) {
            fs.rmSync(`${dir}/${f}`)
          }
        }
      }

      const foundDirector = await this.userRepository.findOne({
        where: { id_user: id_user },
      })

      if (foundDirector) {
        return { status: true, data: foundDirector }
      }

      return { status: false }
    } catch (error) {
      throw new Error(error)
    }
  }
}
