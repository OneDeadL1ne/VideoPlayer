import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModule } from '../user/user.module'
import { Role } from './entities/role.entity'

@Module({
  imports: [SequelizeModule.forFeature([Role]), UserModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleModule],
})
export class RoleModule {}
