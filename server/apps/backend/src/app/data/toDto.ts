import { plainToInstance } from 'class-transformer';

export const toDto =
  <R>(cls: new (...args: any[]) => R): ((data: Partial<R>) => R) =>
  (data: R): R =>
    plainToInstance(cls, data, {
      excludeExtraneousValues: false,
      enableImplicitConversion: true,
      strategy: 'exposeAll',
    });
