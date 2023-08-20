import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfigSchema {
  static _create(config: unknown) {
    return plainToInstance(ConfigSchema, config, {
      exposeDefaultValues: true,
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  @IsString()
  @IsNotEmpty()
  @Expose()
  DATA_SOURCE_POSTGRES_URL: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  AUTH_VERIFY_WEBHOOK_URL: string;

  get auth() {
    return {
      verifyUrl: this.AUTH_VERIFY_WEBHOOK_URL,
    };
  }
}
