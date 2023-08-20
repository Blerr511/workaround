import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from '../../modules/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthenticationService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      const token = this.parseBearerToken(request.headers.authorization);

      const userData = await this.authService.verify(token);

      request['_user'] = userData;
    }

    return true;
  }

  private parseBearerToken(token: string): string {
    return token.replace('Bearer ', '');
  }
}
