import { Module } from '@nestjs/common';
import { MyUserService } from './my-user.service';
import { MyUserResolver } from './my-user.resolver';
import { MyUserDao } from './my-user.dao';

@Module({
  imports: [],
  providers: [MyUserResolver, MyUserDao, MyUserService],
  controllers: [],
  exports: [MyUserService, MyUserDao],
})
export class MyUserModule {}
