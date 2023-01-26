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
import { route } from './Entities/route.entity';
import { station } from './Entities/station.entity';
import { RouteController } from './Controllers/routes.controller';
import { RouteService } from './Services/routes.service';

@Module({
  imports: [
  ],
  controllers: [
    AppController,

  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
