import { NestFactory } from '@nestjs/core';
import { Logger } from '@wr/logger';
import { AppModule } from './modules/app.module';
import { WebSocketServer } from 'ws';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { useServer } from 'graphql-ws/lib/use/ws';

async function bootstrap() {
  const mainLogger = new Logger('GAME');

  const app = await NestFactory.create(AppModule, {
    logger: mainLogger,
  });

  const appPort = Number(process.env.WEB_EXPOSE_PORT);

  await app.listen(appPort);

  const { schema } = app.get(GraphQLSchemaHost);

  const wsServer = new WebSocketServer({
    server: app.getHttpServer(),
    path: '/graphql',
  });

  const serverClanup = useServer({ schema }, wsServer as any);

  mainLogger.log(`Application is running on: http://localhost:${appPort}/`);
}
bootstrap();
