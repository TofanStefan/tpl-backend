import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConfiguration from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './Controllers/user.controller';
import { UserService } from './Services/user.service';
import { user } from './Entities/user.entity';
import { AuthController } from './Controllers/auth.controller';
import { AuthService } from './Services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './AuthStrategies/local.strategy';
import { SessionSerializer } from './AuthStrategies/session.serializer';
import { Session } from './Entities/session.entity';
import { subscription } from './Entities/subscription.entity';
import { SubscriptionController } from './Controllers/subscription.controller';
import { SubscriptionService } from './Services/subscription.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfiguration),
    TypeOrmModule.forFeature([user, subscription, Session]),
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ session: true }),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    SubscriptionController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    LocalStrategy,
    SessionSerializer,
    SubscriptionService,
  ],
})
export class AppModule {}
