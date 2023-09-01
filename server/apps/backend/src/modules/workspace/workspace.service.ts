import { Injectable } from '@nestjs/common';
import { WorkspaceDao } from './data/workspace.dao';

@Injectable()
export class WorkspaceService {
  constructor(private readonly workspaceDao: WorkspaceDao) {}

  async createOrUpdate(data: { id?: number; name: string }) {
    if (typeof data.id === 'number')
      return await this.workspaceDao.update(data.id, { name: data.name });
    else return await this.workspaceDao.create(data);
  }

  async get(id: number) {
    return await this.workspaceDao.get(id);
  }

  async delete(id: number) {
    return await this.workspaceDao.delete(id);
  }
}
