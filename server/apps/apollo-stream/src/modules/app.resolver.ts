import { Resolver, Subscription } from '@nestjs/graphql';

import { GqlPubSub } from '../app/graphql-pubsub';

@Resolver()
export class AppResolver {
  constructor(private readonly pubsub: GqlPubSub) {}

  @Subscription('gameServiceOkS', {
    resolve(payload, args, context, info) {
      console.log(payload);
      return payload;
    },
  })
  async gameServiceOkS() {
    return await this.pubsub.asyncIterator('operation-result');
  }
}
