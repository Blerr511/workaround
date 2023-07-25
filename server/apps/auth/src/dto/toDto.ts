import { plainToInstance } from 'class-transformer';

export const toDto = <R>(data: unknown, cls: new (...args: any[]) => R): R =>
  plainToInstance(cls, data, { excludeExtraneousValues: true });
