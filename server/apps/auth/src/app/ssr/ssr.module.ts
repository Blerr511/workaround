import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RenderMiddleware } from './ssr.middleware';

@Module({
  imports: [],
})
export class SsrModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenderMiddleware).forRoutes('*');
  }
}
