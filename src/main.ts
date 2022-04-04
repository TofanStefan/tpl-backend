import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepository } from 'typeorm';
// sessions:
import * as passport from 'passport';
import * as sessions from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { Session as SessionEntity } from './Entities/session.entity';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

async function bootstrap() {
  const environment = process.env.NODE_ENV || 'development';
  const data = dotenv.parse(fs.readFileSync(`.${environment}.env`)) as any;
  const logger: Logger = new Logger('BOOTSTRAP');
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });
  const sessionRepo = getRepository(SessionEntity);
  const hour = 3600000;
  app.use(
    sessions({
      secret: data.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepo),
      cookie: { maxAge: 7 * 24 * hour }, // cookie dies after 7 days,
    }),
  );

  // initialize sessions
  app.use(passport.initialize());
  app.use(passport.session());
  // this is for deleting extra data from dtos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.NODE_ENV === 'development' ? 5100 : 8080;
  await app.listen(port);
  logger.log(`Server running on port ${port}`);
}
bootstrap();
