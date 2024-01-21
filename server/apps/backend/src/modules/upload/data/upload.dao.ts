import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, Upload } from '@wr/data-source';
import { UploadType } from './upload.types';
import { Pagination } from '../../../app/utils';

@Injectable()
export class UploadDao {
  constructor(private readonly prisma: PrismaClient) {}

  async getById(id: number) {
    return this.prisma.upload.findFirst({
      where: {
        id,
      },
    });
  }

  async create(
    data: Omit<Prisma.UploadCreateInput, 'type'> & { type: UploadType },
  ) {
    return this.prisma.upload.create({
      data: {
        objectId: data.objectId,
        type: data.type,
        directory: data.directory,
        storageClass: data.storageClass,
      },
    });
  }

  async list(
    where: Partial<Pick<Upload, 'type' | 'id'>>,
    pagination: Pagination,
  ): Promise<[Upload[], number]> {
    const selector: Prisma.UploadFindManyArgs = {
      where,
      take: pagination.size,
      skip: pagination.size * pagination.page,
    };

    const uploads = await this.prisma.upload.findMany(selector);

    const count = await this.prisma.upload.count({ where: selector.where });
    this.prisma.upload.delete({ where: {} });
    return [uploads, count];
  }
}
