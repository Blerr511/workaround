import { ApiProperty } from '@nestjs/swagger';
import { User } from '../data/user';

export class UserBaseDto implements Omit<User, 'providers'> {
  @ApiProperty()
  uid: string;
}
