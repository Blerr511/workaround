import { ApiProperty } from '@nestjs/swagger';
import { WrUser } from '../../data/user';
import { Expose } from 'class-transformer';

export class WrUserDto implements Pick<WrUser, 'username' | 'uid'> {
  @ApiProperty()
  @Expose()
  uid: string;

  @ApiProperty()
  @Expose()
  username: string;
}
