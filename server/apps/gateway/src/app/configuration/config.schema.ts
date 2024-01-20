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

  @IsNotEmpty()
  @IsString()
  @Expose()
  WEB_EXPOSE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  WEB_EXPOSE_PORT: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  SERVICE_BACKEND_URL: string;

  get web() {
    return {
      expose: {
        port: this.WEB_EXPOSE_PORT,
        host: this.WEB_EXPOSE_HOST,
      },
    };
  }

  get services() {
    return {
      backend: this.SERVICE_BACKEND_URL,
    };
  }
}
