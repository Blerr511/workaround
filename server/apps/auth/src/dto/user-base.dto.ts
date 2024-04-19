import { Field, ObjectType } from '@nestjs/graphql';
import { WrUser } from '../data/user';
import { Expose } from 'class-transformer';

@ObjectType()
export class UserBaseResponse implements Omit<WrUser, 'providers'> {
  @Field()
  @Expose()
  uid: string;
}
