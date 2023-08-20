import { Inject, Injectable } from '@nestjs/common';
import {
  CONFIG_OPTIONS_TOKEN,
  CONFIG_STORAGE_TOKEN,
  ConfigModuleOptions,
} from './config.const';
import { ConfigSchema } from './config.schema';
import { validate } from 'class-validator';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(CONFIG_OPTIONS_TOKEN) private readonly options: ConfigModuleOptions,
    @Inject(CONFIG_STORAGE_TOKEN) private readonly config: ConfigSchema,
  ) {}

  safeGet<K extends keyof ConfigSchema>(key: K): ConfigSchema[K] {
    const value = this.config[key];

    return value;
  }

  static getInstance() {
    return ConfigSchema._create(process.env);
  }

  protected async onApplicationBootstrap() {
    if (!this.options.ignoreValidation) {
      const errors = await validate(this.config);
      if (errors.length)
        throw new ConfigValidationError(
          errors.at(0).property,
          Object.values(errors.at(0).constraints),
        );
    }
  }
}

export class ConfigValidationError extends Error {
  constructor(property: string, constraints: string[]) {
    super(
      `Config Validation failed for property "${property}" with following constraints -\n${constraints.join(
        '\n',
      )}`,
    );
  }
}
