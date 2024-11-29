import { Module } from '@nestjs/common';
import {
  MODULE_CONFIG,
  MODULE_GRAPHQL,
  MODULE_PRISMA,
} from '../modules/modules';
import { AppResolver } from '../modules/app.resolver';
import { GqlPubSub, GraphqlPubsubModule } from '../app/graphql-pubsub';
import { GameAsyncStorageModule } from '../modules/game-async-storage';
import { GameAdapterModule } from '../modules/game-adapter/game-adapter.module';
import { Resolver, Subscription } from '@nestjs/graphql';
import { OperationResultGql } from '../app/graphql-common/operation-result.gql';

@Resolver()
export class SubsResolver {
  constructor(private readonly pubsub: GqlPubSub) {}

  @Subscription(() => OperationResultGql)
  async gameServiceOkS() {
    return this.pubsub.asyncIterator('operation-result');
  }
}

@Module({
  imports: [
    MODULE_CONFIG,
    MODULE_GRAPHQL,
    GraphqlPubsubModule,
    GameAsyncStorageModule,
  ],
  providers: [SubsResolver],
  exports: [],
})
export class GraphqlSchemaModule {}
