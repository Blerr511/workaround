import { Resolver, Subscription } from '@nestjs/graphql';
import { GqlPubSub } from './app/graphql-pubsub';

@Resolver()
export class SubscriptionsResolver {
  constructor(private readonly pubsub: GqlPubSub) {}

  @Subscription()
  async gameServiceOkS() {
    return this.pubsub.asyncIterator('operation-result');
  }

  @Subscription(() => String)
  async gameServiceOkA() {
    return this.pubsub.asyncIterator('operation-result');
  }
}
