import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './configuration/config.service';
import { Logger } from '@wr/logger';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';

async function bootstrap() {
  const mainLogger = new Logger('APP');

  const app = await NestFactory.create(AppModule, { logger: mainLogger });

  app.setGlobalPrefix('api');

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(port, host);

  mainLogger.info(`Auth app running on "http://${host}:${port}"`);
}
bootstrap();
