import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './configuration/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      prefix: process.env.BAZEL_CONFIG_PREFIX,
      ignoreValidation: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
