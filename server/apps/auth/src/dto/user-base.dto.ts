import { ApiProperty } from '@nestjs/swagger';
import { WrUser } from '../data/user';
import { Expose } from 'class-transformer';

export class UserBaseDto implements Omit<WrUser, 'providers'> {
  @ApiProperty()
  @Expose()
  uid: string;
}
