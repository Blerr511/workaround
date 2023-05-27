import { PrismaClient } from '../../prisma/prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MyUserDao {
  constructor(protected readonly prisma: PrismaClient) {}

  //Dummy
  async findRandomFirst() {
    return await this.prisma.myUser.findFirst();
  }
}
