import { Module, OnApplicationBootstrap } from '@nestjs/common';

import {
  INTERNAL_MODULES,
  MODULE_CONFIG,
  MODULE_GRAPHQL,
  MODULE_PRISMA,
} from './modules';

import { PrismaClient } from '@wr/game-data-source';
import { AppResolver } from './app.resolver';

@Module({
  imports: [MODULE_CONFIG, MODULE_PRISMA, MODULE_GRAPHQL, ...INTERNAL_MODULES],
  providers: [AppResolver],
  exports: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly prismaClient: PrismaClient) {}
  async onApplicationBootstrap() {
    await this.prismaClient.$connect();
  }
}
