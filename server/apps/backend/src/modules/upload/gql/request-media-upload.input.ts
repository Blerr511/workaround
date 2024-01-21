import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { UploadType } from '../data/upload.types';

@InputType('RequestUploadUrlInput')
export class RequestUploadUrlInputGql {
  @Field()
  fileName: string;

  @Field(() => String)
  @IsEnum(UploadType)
  type: UploadType;
}
