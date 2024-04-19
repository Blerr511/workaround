import { Module } from '@nestjs/common';
import { RegistrationResolver } from './registration.resolver';
import { RegistrationService } from './registration.service';
import { DataModule } from '../../data/data.module';
import { UserDao } from '../../data/user';
import { CryptoModule } from '../crypto/crypto.module';
import { AuthProviderDao } from '../../data/auth-provider/auth-provider.dao';

@Module({
  imports: [CryptoModule, DataModule.forFeature(UserDao, AuthProviderDao)],
  providers: [RegistrationResolver, RegistrationService],
})
export class RegistrationModule {}
