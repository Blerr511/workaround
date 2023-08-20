import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenDataResponseDto {
  @ApiProperty()
  @Expose()
  accessToken: string;
}
