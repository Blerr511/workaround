import { Module } from '@nestjs/common';
import { GqlPubSub } from './gql-pubsub';
import { RedisPublisher } from './redis-publisher';
import { RedisSubscriber } from './redis-subscriber';

@Module({
  providers: [GqlPubSub, RedisPublisher, RedisSubscriber],
  exports: [GqlPubSub],
})
export class GraphqlPubsubModule {}
