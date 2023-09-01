import { Module } from '@nestjs/common';
import { WorkspaceDao } from './data/workspace.dao';
import { WorkspaceService } from './workspace.service';
import { WorkspaceResolver } from './workspace.resolver';

@Module({
  providers: [WorkspaceDao, WorkspaceService, WorkspaceResolver],
})
export class WorkspaceModule {}
