import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  WEB_EXPOSE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  WEB_EXPOSE_PORT: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  REDIS_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  REDIS_PORT: number;
}
