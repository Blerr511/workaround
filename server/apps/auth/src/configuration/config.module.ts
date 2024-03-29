import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigSchema } from './config.schema';
import {
  CONFIG_OPTIONS_TOKEN,
  CONFIG_STORAGE_TOKEN,
  ConfigModuleOptions,
} from './config.const';
import { ConfigService } from './config.service';
import { plainToInstance } from 'class-transformer';

function extractConfig(connectionString) {
  // Parse the connection string using a regular expression
  const regex =
    /^postgresql:\/\/([^:]+):([^@]+)@([^:]+):([^\/]+)\/([^?]+)(?:\?schema=(.+))?$/;
  const match = connectionString.match(regex);

  if (match) {
    // Extract and return the configuration details
    const [, user, password, host, port, database, schema] = match;
    return {
      host,
      port,
      user,
      password,
      database,
      schema,
    };
  } else {
    // If the string doesn't match the expected format, throw an error
    throw new Error('Invalid connection string');
  }
}
@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    const providers: Provider[] = [];

    if (process.env.DATA_SOURCE_POSTGRES_URL) {
      const { host, password, port, user, database, schema } = extractConfig(
        process.env.DATA_SOURCE_POSTGRES_URL,
      );

      process.env.POSTGRES_HOST = host;
      process.env.POSTGRES_PORT = port;
      process.env.POSTGRES_PASSWORD = password;
      process.env.POSTGRES_USERNAME = user;
      process.env.POSTGRES_DATABASE = database;
      process.env.POSTGRES_SCHEMA = schema;
    }

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
