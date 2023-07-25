import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './configuration/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './configuration/config.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { RegistrationModule } from './modules/registration/registration.module';

const INTERNAL = [AuthenticationModule, RegistrationModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      prefix: process.env.BAZEL_CONFIG_PREFIX,
      ignoreValidation: false,
    }),

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
          synchronize: false,
        };
      },
    }),
    ...INTERNAL,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
