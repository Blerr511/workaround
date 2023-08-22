export interface AuthUser {
  uid: string;
}

export enum AuthApiProviderType {
  email = 'email',
}

export interface AuthProvider {
  name: string;

  providerId: AuthApiProviderType;

  identifier: string;
}

export interface AuthUserWithProviders extends AuthUser {
  providers: AuthProvider[];
}

export interface AuthApiEmailSignUpParams {
  username: string;
  password: string;
}

export interface AuthApiSignInParams {
  username: string;

  password: string;

  provider: AuthApiProviderType;
}

export interface AuthApiLoginResponse {
  accessToken: string;
}
