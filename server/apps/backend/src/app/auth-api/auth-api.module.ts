import {
  DynamicModule,
  FactoryProvider,
  Module,
  Provider,
} from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { AUTH_API_SETTINGS_TOKEN, AuthApiSettings } from './auth-api.const';

@Module({})
export class AuthApiModule {
  static forRoot(
    factory: Omit<FactoryProvider<AuthApiSettings>, 'provide'>,
  ): DynamicModule {
    const services: Provider[] = [
      AuthApiService,
      {
        provide: AUTH_API_SETTINGS_TOKEN,
        ...factory,
      },
    ];

    return {
      module: AuthApiModule,
      providers: services,
      exports: services,
    };
  }
}
