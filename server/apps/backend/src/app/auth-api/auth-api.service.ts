import { Inject, Injectable } from '@nestjs/common';
import * as axios from 'axios';
import {
  AuthApiEmailSignUpParams,
  AuthApiLoginResponse,
  AuthApiSignInParams,
  AuthUserWithProviders,
} from './auth-api.types';
import { AUTH_API_SETTINGS_TOKEN, AuthApiSettings } from './auth-api.const';

@Injectable()
export class AuthApiService {
  private readonly client: axios.Axios;

  constructor(
    @Inject(AUTH_API_SETTINGS_TOKEN)
    private readonly settings: AuthApiSettings,
  ) {
    this.client = new axios.Axios({
      baseURL: settings.baseUrl,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use((value) => {
      if (value.data) value.data = JSON.stringify(value.data);
      return value;
    });

    this.client.interceptors.response.use((response) => {
      if (response.status > 299 || response.status < 200) {
        throw response.data || response;
      }

      if (response.data && typeof response.data === 'string') {
        response.data = JSON.parse(response.data);
      }

      return response;
    });
  }

  async signUp(params: AuthApiEmailSignUpParams) {
    return await this.client
      .post<AuthUserWithProviders>('/registration/email-pass', {
        email: params.username,
        password: params.password,
      })
      .then((response) => response.data);
  }

  async login(params: AuthApiSignInParams) {
    return await this.client
      .post<AuthApiLoginResponse>('/authentication/sign-in', {
        username: params.username,
        password: params.password,
        provider: params.provider,
      })
      .then((res) => res.data);
  }
}
