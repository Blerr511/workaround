import {
  Directive,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { AuthApiProviderType } from '../../../app/auth-api/auth-api.types';
import { Expose, Type } from 'class-transformer';

@ObjectType('AuthUser')
@Directive('@key(fields: "uid")')
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
@Directive('@key(fields: "providerId")')
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
