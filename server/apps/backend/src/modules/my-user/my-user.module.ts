import { Module } from '@nestjs/common';
import { MyUserService } from './my-user.service';
import { MyUserController } from './my-user.controller';
import { MyUserDao } from './my-user.dao';

@Module({
  imports: [],
  providers: [MyUserDao, MyUserService],
  controllers: [MyUserController],
})
export class MyUserModule {}
