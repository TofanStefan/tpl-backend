import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user_register.dto';
import { user as User } from 'src/Entities/user.entity';
import { UiUser } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm';
import { hashPassword } from '../common/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users_repository: Repository<User>,
  ) {}

  // creates user in db
  async create(user: CreateUserDto): Promise<UiUser> {
    try {
      //hash the password before saving to db
      user.password = await hashPassword(user.password);
      const saved_user = await this.users_repository.save(user);
      // remove password from object
      const { password, ...res } = saved_user;
      return res;
    } catch (error) {
      throw new BadRequestException({
        message: error?.detail?.includes('already exists')
          ? 'This email is already in use'
          : 'Failed to register user',
      });
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.users_repository.findOneOrFail({ email });
    } catch (error) {
      throw new NotFoundException({
        message: 'No user with given email found',
      });
    }
  }
}
