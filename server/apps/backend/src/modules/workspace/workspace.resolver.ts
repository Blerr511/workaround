import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateOrUpdateWorkspaceInputGql,
  DeleteWorkspaceInputGql,
  GetWorkspaceInputGql,
  WorkspaceGql,
} from './gql';
import { WorkspaceService } from './workspace.service';
import { OperationResultGql } from '../../app/graphql-common/operation-result.gql';

@Resolver()
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Query(() => WorkspaceGql)
  async getWorkspace(
    @Args('workspace') { id }: GetWorkspaceInputGql,
  ): Promise<WorkspaceGql> {
    return await this.workspaceService.get(id);
  }

  @Mutation(() => WorkspaceGql)
  async createOrUpdateWorkspace(
    @Args('workspace') data: CreateOrUpdateWorkspaceInputGql,
  ): Promise<WorkspaceGql> {
    return await this.workspaceService.createOrUpdate(data);
  }

  @Mutation(() => OperationResultGql)
  async deleteWorkspace(@Args('workspace') { id }: DeleteWorkspaceInputGql) {
    await this.workspaceService.delete(id);

    return OperationResultGql.ok();
  }
}
