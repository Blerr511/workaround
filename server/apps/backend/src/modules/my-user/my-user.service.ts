import { Injectable } from '@nestjs/common';
import { MyUserDao } from '@wr/data-source';

@Injectable()
export class MyUserService {
  constructor(private readonly myUserDao: MyUserDao) {}

  async some() {
    return this.myUserDao.findRandomFirst();
  }
}
