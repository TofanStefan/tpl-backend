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

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfiguration),
    TypeOrmModule.forFeature([user, Session]),
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    UserService,
    AuthService,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AppModule {}
