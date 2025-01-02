import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { DataModule } from '../../data/data.module';
import { UserDao } from '../../data/user';
import { CryptoModule } from '../crypto/crypto.module';
import { AuthProviderDao } from '../../data/auth-provider/auth-provider.dao';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [CryptoModule, DataModule.forFeature(UserDao, AuthProviderDao)],
  providers: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
