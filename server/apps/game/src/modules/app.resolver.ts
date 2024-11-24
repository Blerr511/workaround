import { Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { OperationResultGql } from '../app/graphql-common/operation-result.gql';
import { GameAsyncStorageService } from './game-async-storage/game-async-storage.service';
import { PubSub } from 'graphql-subscriptions';
import { GqlPubSub } from '../app/graphql-pubsub';

@Resolver()
export class AppResolver {
  constructor(
    private readonly asl: GameAsyncStorageService,
    private readonly pubsub: GqlPubSub,
  ) {}

  @Query(() => OperationResultGql)
  async gameServiceOk() {
    return OperationResultGql.ok(JSON.stringify(this.asl.getState()));
  }

  @Subscription(() => OperationResultGql, {
    resolve(payload, args, context, info) {
      return payload;
    },
  })
  async gameServiceOkS() {
    return this.pubsub.asyncIterator('operation-result');
  }

  @Mutation(() => OperationResultGql)
  async triggerOk() {
    this.pubsub.publish(
      'operation-result',
      OperationResultGql.ok(JSON.stringify(this.asl.getState())),
    );

    return OperationResultGql.ok(JSON.stringify(this.asl.getState()));
  }
}
