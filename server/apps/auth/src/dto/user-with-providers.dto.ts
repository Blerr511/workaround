import { Expose, Type } from 'class-transformer';
import { AuthProviderBaseResponse } from './auth-provider-base.dto';
import { UserBaseResponse } from './user-base.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserWithProvidersResponse extends UserBaseResponse {
  @Field(() => [AuthProviderBaseResponse])
  @Type(() => AuthProviderBaseResponse)
  @Expose()
  providers: AuthProviderBaseResponse[];
}
