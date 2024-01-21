import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Upload } from '@wr/data-source';
import { Expose, Transform } from 'class-transformer';
import { UploadStorageClass } from '../../../modules/upload/data/upload.types';

@ObjectType('Upload')
@Directive('@key(fields: "id")')
export class UploadGql {
  @Field()
  @Expose()
  id: number;

  @Field()
  @Expose()
  type: string;

  @Field()
  @Expose({ name: 'objectId' })
  @Transform(({ obj: upload }: { obj: Upload }) => {
    let url = 'UNKNOWN STORAGE CLASS';

    if (upload.storageClass === UploadStorageClass.gcpS3) {
      url = `https://storage.cloud.google.com/${upload.directory}/${upload.objectId}`;
    }

    return url;
  })
  url?: string;

  @Field()
  @Expose()
  createdAt: Date;
}
