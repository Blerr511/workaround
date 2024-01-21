import { Field, ObjectType } from '@nestjs/graphql';
import { UploadGql } from '../../../app/gql/entities/upload.gql';
import { PaginationResultGql } from '../../../app/gql/entities/pagination.gql';
import { Type } from 'class-transformer';

@ObjectType('ListUploads')
export class ListUploadsGql {
  @Field(() => [UploadGql])
  @Type(() => UploadGql)
  data: UploadGql[];

  @Field()
  meta: PaginationResultGql;
}
