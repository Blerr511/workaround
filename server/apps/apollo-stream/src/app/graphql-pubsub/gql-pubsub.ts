import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RedisPublisher } from './redis-publisher';
import { RedisSubscriber } from './redis-subscriber';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GqlPubSub extends RedisPubSub {
  constructor(
    private readonly publisher: RedisPublisher,
    private readonly subscriber: RedisSubscriber,
  ) {
    super({
      publisher,
      subscriber,
    });
  }
}
