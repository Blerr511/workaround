import { ApiProperty } from '@nestjs/swagger';
import { AuthProvider } from '../data/auth-provider';

export class AuthProviderBaseDto
  implements Omit<AuthProvider, 'user' | 'password'>
{
  @ApiProperty()
  id: string;

  @ApiProperty({ description: 'Name of provider' })
  name: string;

  @ApiProperty({ description: 'unique id of provider' })
  providerId: string;

  @ApiProperty({
    description:
      'User unique identifier, may be different values according to provider type',
  })
  identifier: string;
}
