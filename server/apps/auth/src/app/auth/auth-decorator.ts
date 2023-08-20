import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { WrUser } from '../../data/user';

export const AuthContext = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const user = request['_user'];

    return { user };
  },
);

export interface AuthContext {
  user: WrUser;
}
