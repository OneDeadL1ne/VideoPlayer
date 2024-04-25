import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common'
import { AppError } from 'src/constants/error'
import { UserService } from 'src/modules/user/user.service'


@Injectable()
export class ActiveGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest()

    if (!user) {
      throw new UnauthorizedException(AppError.USER_DEACTIVATED)
    }

    const canActivate = await this.userService.canUserActivate(user.id_user)

    if (canActivate) {
      return canActivate
    } else {
      throw new ForbiddenException(AppError.USER_DEACTIVATED)
    }
  }
}
