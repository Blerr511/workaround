import { AuthProvider } from '../data/auth-provider';
import { Expose } from 'class-transformer';

export class AuthProviderBaseResponse
  implements Omit<AuthProvider, 'user' | 'password'>
{
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  providerId: string;

  @Expose()
  identifier: string;
}
