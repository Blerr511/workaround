import { Expose, Type } from 'class-transformer';
import { AuthProviderBaseDto } from './auth-provider-base.dto';
import { UserBaseDto } from './user-base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserWithProvidersDto extends UserBaseDto {
  @ApiProperty({ type: [AuthProviderBaseDto] })
  @Type(() => AuthProviderBaseDto)
  @Expose()
  providers: AuthProviderBaseDto[];
}
