import { Injectable } from '@nestjs/common';
import { PrismaClient, VideoProject } from '@wr/data-source';

@Injectable()
export class WorkspaceDao {
  constructor(private readonly prisma: PrismaClient) {}

  async get(id: number) {
    return await this.prisma.videoProject.findFirstOrThrow({ where: { id } });
  }

  async create(data: Omit<Partial<VideoProject>, 'id'>) {
    const createdProject = await this.prisma.videoProject.create({
      data,
    });

    return await this.get(createdProject.id);
  }

  async delete(id: number) {
    await this.prisma.videoProject.delete({ where: { id } });
  }

  async update(id: number, data: Omit<Partial<VideoProject>, 'id'>) {
    await this.prisma.videoProject.update({ where: { id }, data });

    return await this.get(id);
  }
}
