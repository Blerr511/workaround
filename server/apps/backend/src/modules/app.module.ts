import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@wr/data-source';

import { VerifyTokenService } from '../app/authorization/verify-token.service';
import {
  INTERNAL_MODULES,
  MODULE_CONFIG,
  MODULE_GRAPHQL,
  MODULE_PRISMA,
} from './modules';

@Module({
  imports: [MODULE_CONFIG, MODULE_PRISMA, MODULE_GRAPHQL, ...INTERNAL_MODULES],
  providers: [VerifyTokenService],
  exports: [VerifyTokenService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly prismaClient: PrismaClient) {}
  async onApplicationBootstrap() {
    await this.prismaClient.$connect();
  }
}
