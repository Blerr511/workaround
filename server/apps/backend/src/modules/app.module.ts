import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaClient, PrismaModule } from '@wr/data-source';

import { AppUserModule } from './auth/entities';
import { ConfigModule } from '../app/configuration/config.module';
import { VerifyTokenService } from '../app/authorization/verify-token.service';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

const internalModules = [AppUserModule, AuthModule, WorkspaceModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreValidation: ['yes', 'true', '1'].includes(
        process.env.__SKIP_CONFIG_VALIDATION,
      ),
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
