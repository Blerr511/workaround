import { Module } from '@nestjs/common';
import { UserDao } from '../../data/user/user.dao';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { DataModule } from '../../data/data.module';
import { AuthProviderDao } from '../../data/auth-provider/auth-provider.dao';
import { CryptoModule } from '../crypto/crypto.module';
import { VerifyController } from './verify.controller';

@Module({
  imports: [DataModule.forFeature(UserDao, AuthProviderDao), CryptoModule],
  providers: [AuthenticationResolver, AuthenticationService],
  exports: [AuthenticationService],
  controllers: [VerifyController],
})
export class AuthenticationModule {}
