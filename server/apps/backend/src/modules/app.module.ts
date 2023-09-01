import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: async (ctx) => {
        const request: Request = ctx.req;

        let user = null;

        const authToken = request.headers.authorization;

        if (authToken) {
          user = await verifyAccessToken(authToken);
        }

        return { user };
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
