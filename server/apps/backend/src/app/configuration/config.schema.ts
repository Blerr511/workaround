import { Expose, Transform, plainToInstance } from 'class-transformer';
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
  POSTGRES_HOST: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  POSTGRES_PORT: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  POSTGRES_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  POSTGRES_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  AUTH_VERIFY_WEBHOOK_URL: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  AUTH_API_URL: string;

  get auth() {
    return {
      apiUrl: this.AUTH_API_URL,
      verifyUrl: this.AUTH_VERIFY_WEBHOOK_URL,
    };
  }
}
