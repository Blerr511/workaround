import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from '@nestjs/apollo';
import { ConfigModule } from './app/configuration/config.module';
import { ConfigService } from './app/configuration';
import { TokenVerifyMiddleware } from './app/token-verify/token-verify.middleware';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphqlPubsubModule } from './app/graphql-pubsub';
import { SubscriptionsResolver } from './subscriptions.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreValidation: ['yes', 'true', '1'].includes(
        process.env.__SKIP_CONFIG_VALIDATION,
      ),
    }),
    GraphqlPubsubModule,
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,

      useFactory: (configService: ConfigService) => {
        return {
          driver: ApolloGatewayDriver,
          server: {
            installSubscriptionHandlers: true,
            playground: false,
            plugins: [
              ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ],
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                // {
                //   name: 'backend',
                //   url: configService.safeGet('services').backend,
                // },
                // {
                //   name: 'auth',
                //   url: configService.safeGet('services').auth,
                // },
                {
                  name: 'game',
                  url: configService.safeGet('services').game,
                },
              ],
            }),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [SubscriptionsResolver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenVerifyMiddleware).forRoutes('*');
  }
}
