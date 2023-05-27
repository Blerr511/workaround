import { PRISMA } from '../lib/tokens';
import { PrismaClient } from '../../prisma/prisma-client';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MyUserDao {
  constructor(@Inject(PRISMA) protected readonly prisma: PrismaClient) {}

  //Dummy
  async findRandomFirst() {
    return await this.prisma.myUser.findFirst();
  }
}
