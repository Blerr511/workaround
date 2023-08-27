import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './configuration/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './configuration/config.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './app/auth';
import { AuthzModule } from './app/authz/authz.module';

const INTERNAL = [AuthenticationModule, RegistrationModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      prefix: process.env.BAZEL_CONFIG_PREFIX,
      ignoreValidation: false,
    }),
    AuthzModule,
    TypeOrmModule.forRootAsync({
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
    }),
    ...INTERNAL,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
