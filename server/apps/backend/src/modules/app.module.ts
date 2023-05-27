import { Module } from '@nestjs/common';
import { PrismaModule } from '@wr/data-source';
import { MyUserModule } from './my-user/my-user.module';

const internalModules = [MyUserModule];

@Module({
  imports: [PrismaModule.forRootAsync(), ...internalModules],
})
export class AppModule {}
