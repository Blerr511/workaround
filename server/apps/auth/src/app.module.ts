import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './app/auth';
import { AuthzModule } from './app/authz/authz.module';
import {
  INTERNAL_MODULES,
  MODULE_CONFIG,
  MODULE_GRAPHQL,
  MODULE_TYPEORM,
} from './modules';

@Module({
  imports: [
    MODULE_CONFIG,
    MODULE_GRAPHQL,
    MODULE_TYPEORM,
    ...INTERNAL_MODULES,
    AuthzModule,
  ],
  controllers: [],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
