import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger } from '@wr/logger';

async function bootstrap() {
  const mainLogger = new Logger('APP');

  const app = await NestFactory.create(AppModule, {
    logger: mainLogger,
  });

  const appPort = 3000;

  await app.listen(appPort);

  mainLogger.log(`Application is running on: http://localhost:${appPort}/`);
}
bootstrap();
