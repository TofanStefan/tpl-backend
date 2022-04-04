import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user_register.dto';
import { subscription } from 'src/Entities/subscription.entity';
import { user as User } from 'src/Entities/user.entity';
import { UiUser } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm';
import { hashPassword } from '../common/utils';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(subscription)
    private readonly subscription_entity: Repository<subscription>,
  ) {}

  // creates user in db
  async create(subscription: any): Promise<any> {
    return await this.subscription_entity.save({
      name: subscription.name,
      price: subscription.price,
    });
  }
  async update(subscription: any): Promise<any> {
    return await this.subscription_entity.save({
      id: subscription.id,
      name: subscription.name,
      price: subscription.price,
    });
  }
  async getAll(): Promise<any> {
    return await this.subscription_entity.find();
  }
  async delete(id) {
    return await this.subscription_entity.delete(id);
  }
}
