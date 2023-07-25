import { User } from '../../user';
import { AuthProvider } from '../auth-provider.entity';

export class EmailProvider implements AuthProvider {
  id: string;
  name = 'email';
  providerId = 'email';
  identifier: string;
  password: string;
  user: User;

  constructor(email: string, hash: string) {
    this.identifier = email;
    this.password = hash;
  }
}
