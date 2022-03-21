import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/Services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
