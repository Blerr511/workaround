import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../app/configuration';
import { Bucket, Storage } from '@google-cloud/storage';
import { UploadDao } from './data/upload.dao';
import { v4 } from 'uuid';
import { UploadStorageClass, UploadType } from './data/upload.types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Pagination } from '../../app/utils';

@Injectable()
export class UploadService {
  private readonly bucket: Bucket;

  constructor(
    private readonly uploadDao: UploadDao,
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
    storage: Storage,
  ) {
    this.bucket = storage.bucket(
      configService.safeGet('gcp').storageBuckets.media.name,
    );
  }

  async requestUploadUrl(type: UploadType, fileName: string, user = 'dummy') {
    const Key = `${user}/${v4()}-${fileName}`;

    const upload = await this.uploadDao.create({
      type,
      objectId: Key,
      storageClass: UploadStorageClass.gcpS3,
      directory: this.bucket.name,
      deletedAt: new Date(),
    });

    const [signedUrl] = await this.bucket.file(Key).getSignedUrl({
      action: 'write',
      version: 'v4',
      expires: Date.now() + 1000 * 60 * 60,
    });

    return {
      upload,
      url: signedUrl,
    };
  }

  async listUploads(pagination: Pagination, type?: UploadType) {
    return await this.uploadDao.list({ type }, pagination);
  }

  async _devOnComplete(id: number) {
    await this.amqpConnection.publish(
      'dev',
      this.configService.safeGet('rmqQueues').saveFragments,
      {
        uploadId: id,
      },
    );
  }
}
