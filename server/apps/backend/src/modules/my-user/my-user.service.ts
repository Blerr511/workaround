import { Injectable } from '@nestjs/common';
import { MyUserDao } from './my-user.dao';

@Injectable()
export class MyUserService {
  constructor(private readonly myUserDao: MyUserDao) {}

  async dummy() {
    return this.myUserDao.dummy();
  }
}
