import { Module } from '@nestjs/common';
import { UserDao } from '../../data/user/user.dao';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { DataModule } from '../../data/data.module';
import { AuthProviderDao } from '../../data/auth-provider/auth-provider.dao';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  imports: [DataModule.forFeature(UserDao, AuthProviderDao), CryptoModule],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
