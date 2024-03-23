import { PrismaModule } from '@wr/data-source';
import { AuthModule } from './auth/auth.module';
import { AppUserModule } from './auth/entities';
import { WorkspaceModule } from './workspace/workspace.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule } from '../app/configuration/config.module';

export const INTERNAL_MODULES = [AppUserModule, AuthModule, WorkspaceModule];

export const MODULE_CONFIG = ConfigModule.forRoot({
  ignoreValidation: ['yes', 'true', '1'].includes(
    process.env.__SKIP_CONFIG_VALIDATION,
  ),
});

export const MODULE_PRISMA = PrismaModule.forRootAsync();

export const MODULE_GRAPHQL =
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2,
    },
  });
