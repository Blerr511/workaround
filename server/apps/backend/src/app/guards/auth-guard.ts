import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly moduleRef: ModuleRef) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    console.log('guard');

    return true;
  }
}
