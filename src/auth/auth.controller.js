import { Controller, Dependencies, UseGuards, Post, Request, Body, Get, Bind } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ValidateBody } from '../validate.decorator';

@Controller('auth')
@Dependencies(AuthService)
export class AuthController {
  constructor (authService) {
    this.authService = authService;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ValidateBody({
    login: 'required|string',
    password: 'required|string|min:5|max:100',
  })
  @Bind(Request(), Body())
  async login(request, payload) {
    return this.authService.login(request.user, payload);
  }

  @Post('register')
  @ValidateBody({
    name: 'required|string|min:3|max:16',
    email: 'required|email',
    password: 'required|string|min:5|max:100',
    tos: 'required|boolean|accepted',
  })
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
