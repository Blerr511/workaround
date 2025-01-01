import { WrUser } from '../data/user';
import { Expose } from 'class-transformer';

export class UserBaseResponse implements Omit<WrUser, 'providers'> {
  username: string;
  passwordHash: string;
  @Expose()
  uid: string;
}
