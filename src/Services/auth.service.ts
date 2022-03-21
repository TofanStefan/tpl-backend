import { Injectable } from '@nestjs/common';
import { UserLogInDto } from 'src/dtos/user_login.dto';
import { UiUser } from 'src/interfaces/user.interface';
import { UserService } from './user.service';
import { comparePasswords } from 'src/common/utils';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(user: UserLogInDto): Promise<UiUser> {
    try {
      // get user from db
      const db_user = await this.userService.getUserByEmail(user.email);
      const { password, ...rest } = db_user;
      // compare passwords
      return (await comparePasswords(user.password, password)) ? rest : null;
    } catch (error) {
      //if user was not found return null
      return null;
    }
  }
}
