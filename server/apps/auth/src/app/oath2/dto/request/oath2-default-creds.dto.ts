import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Oauth2DefaultCreeds {
  @Expose({ name: 'client_id' })
  @ApiProperty({ name: 'client_id' })
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @Expose({ name: 'redirect_uri' })
  @ApiProperty({ name: 'redirect_uri' })
  @IsNotEmpty()
  @IsString()
  redirectUri: string;

  @Expose({ name: 'response_type' })
  @ApiProperty({ name: 'response_type', type: String })
  @IsNotEmpty()
  @IsString()
  responseType = 'code';

  @Expose({ name: 'scope' })
  @ApiProperty({ name: 'scope' })
  @IsNotEmpty()
  @IsString()
  scope: string;

  @Expose({ name: 'state' })
  @ApiPropertyOptional({ name: 'state' })
  @IsOptional()
  @IsString()
  state: string;
}

export class Oauth2CreedsWithApprove extends Oauth2DefaultCreeds {
  @Expose()
  @ApiProperty({
    enum: ['yes', 'no'],
  })
  @IsNotEmpty()
  @IsEnum(['yes', 'no'])
  approve: 'yes' | 'no';
}
