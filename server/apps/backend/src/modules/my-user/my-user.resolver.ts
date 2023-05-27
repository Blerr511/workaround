import { MyUser } from '@wr/data-source';
import { MyUserService } from './my-user.service';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@ObjectType()
export class MYs implements MyUser {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}

@Resolver(() => MYs)
@Injectable()
export class MyUserResolver {
  constructor(private readonly myUserService: MyUserService) {}

  @Query(() => MYs)
  dummy() {
    return this.myUserService.dummy().then((d) => plainToInstance(MYs, d));
  }
}
