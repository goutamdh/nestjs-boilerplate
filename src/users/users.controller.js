import { Controller, Dependencies, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersExceptionFilter } from './users-exception.filter';

@Controller('users')
@UseFilters(UsersExceptionFilter)
@Dependencies(UsersService)
export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }
  
}
