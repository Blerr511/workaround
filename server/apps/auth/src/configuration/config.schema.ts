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
  WEB_EXPOSE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  WEB_EXPOSE_PORT: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  POSTGRES_HOST: string;

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
  POSTGRES_SCHEMA: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  JWT_SECRET: string;

  @Transform(({ value }) => parseInt(String(value)))
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  JWT_LIFE_SECONDS: number;

  @Expose()
  AUTHZ_DOMAIN: string;

  @Expose()
  AUTHZ_CLIENT_ID: string;

  @Expose()
  AUTHZ_CLIENT_SECRET: string;

  get authz() {
    return {
      domain: this.AUTHZ_DOMAIN,
      clientId: this.AUTHZ_CLIENT_ID,
      secret: this.AUTHZ_CLIENT_SECRET,
      callbackUrl: 'http://localhost:3002/api/authentication/callback',
    };
  }

  get web() {
    return {
      host: this.WEB_EXPOSE_HOST,
      port: this.WEB_EXPOSE_PORT,
    };
  }

  get postgres() {
    return {
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      username: this.POSTGRES_USERNAME,
      password: this.POSTGRES_PASSWORD,
      database: this.POSTGRES_DATABASE,
      schema: this.POSTGRES_SCHEMA,
    };
  }

  get crypto() {
    return {
      salt: 10,
      jwtSecret: this.JWT_SECRET,
      jwtLifeSeconds: this.JWT_LIFE_SECONDS,
    };
  }
}
