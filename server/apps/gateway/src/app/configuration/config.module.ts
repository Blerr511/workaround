import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigSchema } from './config.schema';
import {
  CONFIG_OPTIONS_TOKEN,
  CONFIG_STORAGE_TOKEN,
  ConfigModuleOptions,
} from './config.const';
import { ConfigService } from './config.service';
import { plainToInstance } from 'class-transformer';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    const providers: Provider[] = [];

    providers.push({
      provide: CONFIG_OPTIONS_TOKEN,
      useValue: options,
    });

    if (options?.prefix) {
      const prefix = options.prefix;
      for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith(prefix)) {
          const newKey = key.replace(prefix, '');
          process.env[newKey] = value;
          delete process.env[key];
        }
      }
    }

    const config = plainToInstance(ConfigSchema, process.env, {
      exposeDefaultValues: true,
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });

    providers.push({
      provide: CONFIG_STORAGE_TOKEN,
      useValue: config,
    });

    providers.push(ConfigService);

    const exports = [ConfigService];

    return {
      module: ConfigModule,
      providers,
      exports,
    };
  }
}
