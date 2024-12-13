import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { AuthorizationCode, OAuth2Client } from './oath2-interface';

@Injectable()
export class Oauth2Service {
  private clients: OAuth2Client[] = [
    {
      clientId: 'client_123',
      clientSecret: 'secret_abc',
      redirectUris: ['http://localhost:4000/callback'],
    },
  ];

  private codes: AuthorizationCode[] = [];

  validateClient(clientId: string, redirectUri: string): boolean {
    const client = this.clients.find((c) => c.clientId === clientId);
    return !!(client && client.redirectUris.includes(redirectUri));
  }

  generateCode(clientId: string, redirectUri: string, userId: string): string {
    const code = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min validity
    this.codes.push({ code, clientId, redirectUri, userId, expiresAt });
    return code;
  }

  consumeCode(codeStr: string): AuthorizationCode | null {
    const idx = this.codes.findIndex((c) => c.code === codeStr);
    if (idx === -1) return null;
    const code = this.codes[idx];
    if (code.expiresAt < new Date()) {
      this.codes.splice(idx, 1);
      return null;
    }
    this.codes.splice(idx, 1);
    return code;
  }

  getClient(clientId: string): OAuth2Client | undefined {
    return this.clients.find((c) => c.clientId === clientId);
  }

  generateAccessToken(): string {
    return randomBytes(32).toString('hex');
  }
}
