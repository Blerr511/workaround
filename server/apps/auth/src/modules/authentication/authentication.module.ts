import { Module } from '@nestjs/common';
import { UserDao } from '../../data/user/user.dao';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { DataModule } from '../../data/data.module';

@Module({
  imports: [DataModule.forFeature(UserDao)],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
