import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { AuthApiProviderType } from '../../../app/auth-api/auth-api.types';
import { Expose } from 'class-transformer';

@InputType('SignInParams')
export class SignInParamsGql {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => AuthApiProviderType)
  @IsEnum(AuthApiProviderType)
  provider: AuthApiProviderType;
}

@ObjectType('SignInResponse')
export class SignInResponseGql {
  @Field()
  @Expose()
  accessToken: string;
}
