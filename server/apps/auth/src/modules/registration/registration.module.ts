import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { DataModule } from '../../data/data.module';
import { UserDao } from '../../data/user';
import { CryptoModule } from '../crypto/crypto.module';
import { AuthProviderDao } from '../../data/auth-provider/auth-provider.dao';

@Module({
  imports: [CryptoModule, DataModule.forFeature(UserDao, AuthProviderDao)],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
