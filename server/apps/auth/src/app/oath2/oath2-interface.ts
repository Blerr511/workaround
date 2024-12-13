export interface OAuth2Client {
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  // Possibly more fields
}

export interface AuthorizationCode {
  code: string;
  clientId: string;
  redirectUri: string;
  userId: string;
  expiresAt: Date;
}
