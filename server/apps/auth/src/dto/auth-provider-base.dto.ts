import { ApiProperty } from '@nestjs/swagger';
import { AuthProvider } from '../data/auth-provider';
import { Expose } from 'class-transformer';

export class AuthProviderBaseDto
  implements Omit<AuthProvider, 'user' | 'password'>
{
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ description: 'Name of provider' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'unique id of provider' })
  @Expose()
  providerId: string;

  @ApiProperty({
    description:
      'User unique identifier, may be different values according to provider type',
  })
  @Expose()
  identifier: string;
}
