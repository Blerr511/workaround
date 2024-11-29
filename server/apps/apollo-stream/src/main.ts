import { NestFactory } from '@nestjs/core';
import { Logger } from '@wr/logger';
import { AppModule } from './modules/app.module';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

async function bootstrap() {
  const mainLogger = new Logger('GAME');

  const app = await NestFactory.create(AppModule, {
    logger: mainLogger,
  });

  const appPort = Number(process.env.WEB_EXPOSE_PORT);

  // const wsServer = new WebSocketServer({
  //   server: app.getHttpServer(),
  //   path: '/graphql',
  // });

  console.log(process.env.GQL_SOURCES);

  // const serverClanup = useServer({}, wsServer as any);

  await app.listen(appPort);

  mainLogger.log(`Application is running on: http://localhost:${appPort}/`);
}
bootstrap();
