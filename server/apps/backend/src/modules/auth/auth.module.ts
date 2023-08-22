import { Module } from '@nestjs/common';
import { AuthApiModule } from '../../app/auth-api/auth-api.module';
import { ConfigService } from '../../app/configuration';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    AuthApiModule.forRoot({
      useFactory: (configService: ConfigService) => {
        return { baseUrl: configService.safeGet('auth').apiUrl };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver],
})
export class AuthModule {}
