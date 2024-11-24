import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule } from '../app/configuration/config.module';
import { PrismaModule } from '@wr/game-data-source';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export const INTERNAL_MODULES = [];

export const MODULE_CONFIG = ConfigModule.forRoot({
  ignoreValidation: ['yes', 'true', '1'].includes(
    process.env.__SKIP_CONFIG_VALIDATION,
  ),
});

export const MODULE_GRAPHQL =
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2,
    },
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

export const MODULE_PRISMA = PrismaModule.forRootAsync();
