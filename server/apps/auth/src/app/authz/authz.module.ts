import {
  DynamicModule,
  FactoryProvider,
  Module,
  Provider,
} from '@nestjs/common';
import {
  AUTH_Z_MODULE_SETTINGS_TOKEN,
  AuthZModuleSettings,
} from './authz.const';
import { AuthzService } from './authz.service';
import { AuthenticationClient } from 'auth0';

@Module({})
export class AuthzModule {
  static forRoot(factory: FactoryProvider<AuthZModuleSettings>): DynamicModule {
    const services: Provider[] = [AuthzService];

    const options: Provider = {
      provide: AUTH_Z_MODULE_SETTINGS_TOKEN,
      ...factory,
    };

    services.push({
      provide: AuthenticationClient,
      useFactory(options: AuthZModuleSettings) {
        return new AuthenticationClient({ ...options });
      },
      inject: [AUTH_Z_MODULE_SETTINGS_TOKEN],
    });

    return {
      module: AuthzModule,
      exports: services,
      providers: [...services, options],
    };
  }
}
