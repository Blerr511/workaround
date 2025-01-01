import { Global, Module } from '@nestjs/common';
import { DataModule } from '../../data/data.module';
import { UserDao } from '../../data/user';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './local.strategy';
import { UsersSerializer } from './user.serializer';

@Global()
@Module({
  imports: [
    DataModule.forFeature(UserDao),
    PassportModule.register({
      session: true,
      defaultStrategy: 'local',
    }),
  ],
  providers: [JwtStrategy, UsersSerializer],
})
export class AuthPassportModule {}
