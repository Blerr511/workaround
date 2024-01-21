import { Field, ObjectType } from '@nestjs/graphql';
import { UploadGql } from '../../../app/gql/entities/upload.gql';

@ObjectType('RequestMediaUploadOutput')
export class RequestMediaUploadOutputGql {
  @Field()
  url: string;

  @Field()
  upload: UploadGql;
}
