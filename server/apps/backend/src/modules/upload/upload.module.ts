import { Module } from '@nestjs/common';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';
import { UploadDao } from './data/upload.dao';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '../../app/configuration';
import { GcpStorageModule } from '../../app/gcp/storage/gcp-storage.module';

@Module({
  imports: [
    GcpStorageModule.forRoot(),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.safeGet('RMQ_URL'),
          exchanges: [
            {
              name: 'dev',
              type: 'topic',
            },
          ],
          connectionInitOptions: {
            wait: true,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [UploadResolver, UploadService, UploadDao],
  exports: [UploadDao],
})
export class UploadModule {}
