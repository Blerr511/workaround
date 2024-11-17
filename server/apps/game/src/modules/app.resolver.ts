import { Query, Resolver } from '@nestjs/graphql';

import { OperationResultGql } from '../app/graphql-common/operation-result.gql';

@Resolver()
export class AppResolver {
  @Query(() => OperationResultGql)
  async gameServiceOk() {
    return OperationResultGql.ok();
  }
}
