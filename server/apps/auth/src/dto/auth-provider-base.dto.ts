import { Field, ObjectType } from '@nestjs/graphql';
import { AuthProvider } from '../data/auth-provider';
import { Expose } from 'class-transformer';

@ObjectType()
export class AuthProviderBaseResponse
  implements Omit<AuthProvider, 'user' | 'password'>
{
  @Field()
  @Expose()
  id: string;

  @Field({ description: 'Name of provider' })
  @Expose()
  name: string;

  @Field({ description: 'unique id of provider' })
  @Expose()
  providerId: string;

  @Field({
    description:
      'User unique identifier, may be different values according to provider type',
  })
  @Expose()
  identifier: string;
}
