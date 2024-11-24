import { Redis } from 'ioredis';
import { ConfigService } from '../configuration';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisSubscriber extends Redis {
  constructor(config: ConfigService) {
    // TODO - move to configs
    super({
      host: 'localhost',
      port: 8379,
      name: 'RedisSubscriber',
    });
  }
}
