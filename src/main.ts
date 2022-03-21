import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// sessions:
import * as passport from 'passport';
import * as sessions from 'express-session';

async function bootstrap() {
  const logger: Logger = new Logger('BOOTSTRAP');
  const app = await NestFactory.create(AppModule);
  app.use(
    sessions({
      secret: 'keyboard',
      resave: false,
      saveUnintializes: false,
      cookie: { maxAge: 3600 },
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

  const port = process.env.NODE_ENV === 'development' ? 3000 : 80;
  await app.listen(port);
  logger.log(`Server running on port ${port}`);
}
bootstrap();
