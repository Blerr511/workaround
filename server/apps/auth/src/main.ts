import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './configuration/config.service';
import { Logger } from '@wr/logger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const mainLogger = new Logger('AUTH');

  const app = await NestFactory.create(AppModule, { logger: mainLogger });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  const config = app.get(ConfigService);

  const { host, port } = config.safeGet('web');

  await app.listen(port, host);

  mainLogger.info(`Auth app running on "http://${host}:${port}"`);
}
bootstrap();
