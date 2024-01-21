import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigModule } from './app/configuration/config.module';
import { ConfigService } from './app/configuration';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,

      useFactory: (configService: ConfigService) => {
        return {
          driver: ApolloGatewayDriver,
          server: {
            playground: false,
            plugins: [
              ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ],
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                {
                  name: 'backend',
                  url: configService.safeGet('services').backend,
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
  providers: [],
})
export class AppModule {}
