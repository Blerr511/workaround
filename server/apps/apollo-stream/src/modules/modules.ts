import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '../app/configuration/config.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigService } from '../app/configuration';
import { IntrospectAndCompose } from '@apollo/gateway';
import { join } from 'path';

export const INTERNAL_MODULES = [];

export const MODULE_CONFIG = ConfigModule.forRoot({
  ignoreValidation: ['yes', 'true', '1'].includes(
    process.env.__SKIP_CONFIG_VALIDATION,
  ),
});

export const MODULE_GRAPHQL = GraphQLModule.forRootAsync<ApolloDriverConfig>({
  driver: ApolloDriver,
  useFactory: async () => {
    return {
      typePaths: [process.env.GQL_SOURCES],
      playground: false,
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
      path: 'graphql',
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          embed: true,
        }),
      ],
    };
  },
});
