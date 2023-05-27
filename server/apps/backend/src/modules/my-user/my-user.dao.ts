import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@wr/data-source';

@Injectable()
export class MyUserDao {
  constructor(private readonly prisma: PrismaClient) {}

  dummy() {
    return this.prisma.myUser.findFirst();
  }
}
