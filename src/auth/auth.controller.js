import { Controller, Dependencies, UseGuards, Post, Request, Body, Get, Bind, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthExceptionFilter } from './auth-exception.filter';

@Controller('auth')
@UseFilters(AuthExceptionFilter)
@Dependencies(AuthService)
export class AuthController {
  constructor (authService) {
    this.authService = authService;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @Bind(Request(), Body())
  async login(request, payload) {
    return this.authService.login(request.user, payload);
  }

  @Post('register')
  @Bind(Request(), Body())
  async register(request, payload) {
    return this.authService.register(request, payload);
  }

  @UseGuards(AuthGuard('bearer'))
  @Get('user')
  @Bind(Request())
  async user(request) {
    return request.user;
  }
  
}
