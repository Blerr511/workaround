import { Expose, Type } from 'class-transformer';
import { AuthProviderBaseResponse } from './auth-provider-base.dto';
import { UserBaseResponse } from './user-base.dto';

export class UserWithProvidersResponse extends UserBaseResponse {
  @Type(() => AuthProviderBaseResponse)
  @Expose()
  providers: AuthProviderBaseResponse[];
}
