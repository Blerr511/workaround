import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserInfoResponseDto {
  @Expose()
  @ApiProperty()
  uid: string;
}
