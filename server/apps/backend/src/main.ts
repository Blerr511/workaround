import { ModuleRef, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger } from '@wr/logger';
import { AuthGuard } from './app/guards/auth-guard';

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

async function bootstrap() {
  const mainLogger = new Logger('BACKEND');

  const app = await NestFactory.create(AppModule, {
    logger: mainLogger,
  });

  app.useGlobalGuards(new AuthGuard(app.get(ModuleRef)));

  const appPort = Number(process.env.WEB_EXPOSE_PORT);

  await app.listen(appPort);

  mainLogger.log(`Application is running on: http://localhost:${appPort}/`);
}
bootstrap();
