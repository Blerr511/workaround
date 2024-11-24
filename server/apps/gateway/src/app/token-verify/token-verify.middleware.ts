import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TokenVerifyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    console.log(token);

    if (token) {
      const tokenData = { userId: '1' };

      req.headers['x-user-id'] = tokenData.userId;
    }

    next();
  }
}
