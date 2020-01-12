import { Controller, Dependencies, UseFilters, UseGuards, Get, Bind, Param, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersExceptionFilter } from './users-exception.filter';

import { AuthGuard } from '@nestjs/passport';
import { UserRoles, ROLES_BUILDER_TOKEN } from 'nest-access-control';

@Controller('users')
@UseFilters(UsersExceptionFilter)
@Dependencies(UsersService, ROLES_BUILDER_TOKEN)
export class UsersController {
  constructor(usersService, rolesBuilder) {
    this.usersService = usersService;
    this.roles = rolesBuilder;
    console.log(this);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  @Bind(UserRoles(), Param())
  async test (roles, { userId }) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException();
    const permission = this.roles.permission({
      role: roles,
      resource: 'user',
      action: 'read:any',
    });
    if (!permission.granted) throw new UnauthorizedException();
    return permission.filter(user.toObject());
  }
}
