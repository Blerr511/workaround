import { Module } from '@nestjs/common';

import { MODULE_CONFIG, MODULE_GRAPHQL } from './modules';

import { AppResolver } from './app.resolver';
import { GraphqlPubsubModule } from '../app/graphql-pubsub';

@Module({
  imports: [MODULE_CONFIG, MODULE_GRAPHQL, GraphqlPubsubModule],
  providers: [AppResolver],
  exports: [],
})
export class AppModule {}
