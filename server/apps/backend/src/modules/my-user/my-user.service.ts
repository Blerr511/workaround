import { Injectable } from '@nestjs/common';
import { MyUserDao } from './my-user.dao';
import { AppUser } from '../auth/entities';

@Injectable()
export class MyUserService {
  constructor(
    private readonly callee: AppUser,
    private readonly myUserDao: MyUserDao,
  ) {}

  async dummy() {
    const r = await this.myUserDao.dummy();

    return r;
  }
}
