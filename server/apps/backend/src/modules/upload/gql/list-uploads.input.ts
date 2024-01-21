import { Field, InputType } from '@nestjs/graphql';
import { UploadType } from '../data/upload.types';
import { IsEnum } from 'class-validator';

@InputType('ListUploadsInput')
export class ListUploadsInputGql {
  @Field(() => String)
  @IsEnum(UploadType)
  type: UploadType;
}
