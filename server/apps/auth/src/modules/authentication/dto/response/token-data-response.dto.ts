import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class TokenDataResponseDto {
  @Field()
  @Expose()
  accessToken: string;
}
