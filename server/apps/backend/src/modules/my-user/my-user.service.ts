import { Inject, Injectable, createParamDecorator } from '@nestjs/common';
import { MyUserDao } from './my-user.dao';
import { CONTEXT } from '@nestjs/graphql';
import { AppUser } from '../auth/entities';

const A = createParamDecorator((c) => {
  console.log(c);

  return { a: 1 };
});

@Injectable()
export class MyUserService {
  constructor(private readonly myUserDao: MyUserDao) {}

  async dummy() {
    // console.log(this.callee);
    return this.myUserDao.dummy();
  }
}
