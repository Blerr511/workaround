import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaClient, PrismaModule } from '@wr/data-source';
import { join } from 'path';

import { AppUserModule } from './auth/entities';
import { MyUserModule } from './my-user/my-user.module';
import { ConfigModule } from '../app/configuration/config.module';
import {
  VerifyTokenService,
  verifyAccessToken,
} from '../app/authorization/verify-token.service';
import { Request } from 'express';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

const internalModules = [
  AppUserModule,
  MyUserModule,
  AuthModule,
  WorkspaceModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreValidation: false,
    }),
    PrismaModule.forRootAsync(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ...internalModules,
  ],
  providers: [VerifyTokenService],
  exports: [VerifyTokenService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly prismaClient: PrismaClient) {}
  async onApplicationBootstrap() {
    await this.prismaClient.$connect();
  }
}
