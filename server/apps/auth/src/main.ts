import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './configuration/config.service';
import { Logger } from '@wr/logger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const mainLogger = new Logger('AUTH');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: mainLogger,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());

  const config = app.get(ConfigService);

  const { host, port } = config.safeGet('web');

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs');

  await app.listen(port, host);

  mainLogger.info(`Auth app running on "http://${host}:${port}"`);
}
bootstrap();
