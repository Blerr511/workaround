import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
// import { Logger, LogLevel } from '@wr/logger';

// Logger.configure({
//   logLevel: LogLevel.debug,
// });

// const l = new Logger('asd');

// l.info('working');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
