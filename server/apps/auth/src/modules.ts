import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule } from './configuration/config.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './configuration/config.service';
import { DynamicModule } from '@nestjs/common';

export const INTERNAL_MODULES = [RegistrationModule, AuthenticationModule];

export const MODULE_CONFIG = ConfigModule.forRoot({
  ignoreValidation: ['yes', 'true', '1'].includes(
    process.env.__SKIP_CONFIG_VALIDATION,
  ),
});
export const MODULE_GRAPHQL: DynamicModule =
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2,
    },
  });

export const MODULE_TYPEORM = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const { database, host, password, port, schema, username } =
      configService.safeGet('postgres');

    return {
      type: 'postgres',
      host,
      port,
      database,
      username,
      password,
      schema,
      autoLoadEntities: true,
      entities: ['*.entity.{ts,js}'],
      synchronize: false,
    };
  },
});
