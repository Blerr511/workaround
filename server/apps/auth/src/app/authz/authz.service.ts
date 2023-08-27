import { Injectable } from '@nestjs/common';
import { AuthenticationClient } from 'auth0';

@Injectable()
export class AuthzService {
  constructor(private readonly authenticationClient: AuthenticationClient) {}

  async getAccessToken(code: string) {
    return this.authenticationClient.oauth.authorizationCodeGrant({
      code,
      redirect_uri: '',
    });
  }
}
