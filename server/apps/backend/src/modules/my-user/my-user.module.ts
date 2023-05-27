import { Module } from '@nestjs/common';
import { MyUserDao, PrismaModule } from '@wr/data-source';
import { MyUserService } from './my-user.service';
import { MyUserController } from './my-user.controller';

@Module({
  imports: [PrismaModule.forDao([MyUserDao])],
  providers: [MyUserService],
  controllers: [MyUserController],
})
export class MyUserModule {}
