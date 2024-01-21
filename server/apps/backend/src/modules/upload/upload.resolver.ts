import { Injectable } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UploadGql } from '../../app/gql/entities/upload.gql';
import { RequestUploadUrlInputGql } from './gql/request-media-upload.input';
import { UploadService } from './upload.service';
import { RequestMediaUploadOutputGql } from './gql/request-media-upload.output';
import { PaginationGql } from '../../app/gql/entities/pagination.gql';
import { ListUploadsInputGql } from './gql/list-uploads.input';
import { ListUploadsGql } from './gql/list-uploads.output';
import { toDto } from '../../app/data/toDto';

@Injectable()
@Resolver(() => UploadGql)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Query(() => RequestMediaUploadOutputGql)
  async requestUploadUrl(
    @Args('upload') data: RequestUploadUrlInputGql,
  ): Promise<RequestMediaUploadOutputGql> {
    const { upload, url } = await this.uploadService.requestUploadUrl(
      data.type,
      data.fileName,
    );

    return toDto(RequestMediaUploadOutputGql)({ upload, url });
  }

  @Query(() => ListUploadsGql)
  async listUploads(
    @Args('pagination') pagination: PaginationGql,
    @Args('upload') upload: ListUploadsInputGql,
  ): Promise<ListUploadsGql> {
    const r = await this.uploadService
      .listUploads(pagination, upload.type)
      .then(([data, total]) =>
        toDto(ListUploadsGql)({ meta: { total }, data }),
      );

    console.log(r);

    return r;
  }
}
