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
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from 'src/app/configuration';

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
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.safeGet('RMQ_URL'),
          exchanges: [
            {
              name: 'dev',
              type: 'topic',
            },
          ],
          connectionInitOptions: {
            wait: true,
          },
        };
      },
      inject: [ConfigService],
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
