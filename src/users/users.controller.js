import { Controller, Dependencies, UseGuards, Get, Bind, Param, NotFoundException, UnauthorizedException, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthGuard } from '@nestjs/passport';
import { UserRoles, ROLES_BUILDER_TOKEN } from 'nest-access-control';
import { ValidateBody, ValidateParams } from '../validate.decorator';

@Controller('users')
@Dependencies(UsersService, ROLES_BUILDER_TOKEN)
export class UsersController {
  constructor(usersService, rolesBuilder) {
    this.usersService = usersService;
    this.roles = rolesBuilder;
  }
  
  @Post('resetPassword')
  @ValidateBody({
    email: 'required_without:token|email',
    token: 'required_without:email|string|min:16',
    password: 'required_with:token|string|min:5|max:100',
  })
  @Bind(Body())
  async resetPassword(payload) {
    return this.usersService.resetPassword(payload);
  }

  @UseGuards(AuthGuard('bearer'))
  @Get(':userId')
  @ValidateParams({
    userId: 'required|hex|size:24',
  })
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
