import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AuthApiProviderType } from '../../../app/auth-api/auth-api.types';
import { Expose, Type } from 'class-transformer';

@ObjectType('AuthUser')
export class AuthUserGql {
  @Field()
  @Expose()
  uid: string;

  @Field(() => [AuthProviderGql], { nullable: true })
  @Expose()
  @Type(() => AuthProviderGql)
  providers: AuthProviderGql[];
}

registerEnumType(AuthApiProviderType, {
  name: 'AuthApiProviderType',
  valuesMap: {
    [AuthApiProviderType.email]: {
      description: 'email',
    },
  },
});

@ObjectType('AuthProvider')
export class AuthProviderGql {
  @Field()
  @Expose()
  name: string;

  @Field()
  @Expose()
  providerId: string;

  @Field()
  @Expose()
  identifier: string;
}
