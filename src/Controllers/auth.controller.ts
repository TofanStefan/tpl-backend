import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/AuthStrategies/authenticated.guard';
import { LocalAuthGuard } from 'src/AuthStrategies/local-auth.guard';
import { CreateUserDto } from 'src/dtos/user_register.dto';
import { AuthService } from 'src/Services/auth.service';
import { UserService } from 'src/Services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  //login endpoint
  @UseGuards(AuthenticatedGuard)
  @Get()
  async test(@Request() req) {
    return req.user;
  }
  //login endpoint
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
  // used for register
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }
  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  async logout(@Request() req): Promise<any> {
    req.logout();
    return { message: 'logged out' };
  }
}
