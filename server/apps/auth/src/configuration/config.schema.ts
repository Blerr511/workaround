import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfigSchema {
  @IsString()
  @IsNotEmpty()
  @Expose()
  WEB_EXPOSE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  WEB_EXPOSE_PORT: number;

  get web() {
    return {
      host: this.WEB_EXPOSE_HOST,
      port: this.WEB_EXPOSE_PORT,
    };
  }
}
