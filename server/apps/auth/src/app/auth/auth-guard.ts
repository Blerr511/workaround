import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from '../../modules/authentication/authentication.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthenticationService) {}

  async canActivate(ctx: ExecutionContext) {
    const context = GqlExecutionContext.create(ctx as any);

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
