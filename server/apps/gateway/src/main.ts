import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './app/configuration';
import { Logger } from '@wr/logger';

async function bootstrap() {
  const mainLogger = new Logger('GATEWAY');

  const app = await NestFactory.create(AppModule, {
    logger: mainLogger,
  });

  const configService = app.get(ConfigService);

  await app.listen(configService.safeGet('web').expose.port);
}
bootstrap();
