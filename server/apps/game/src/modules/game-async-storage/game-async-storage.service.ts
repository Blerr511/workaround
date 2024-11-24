import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { AsyncContext } from './game-async-storage.types';

@Injectable()
export class GameAsyncStorageService {
  constructor(private readonly als: AsyncLocalStorage<AsyncContext>) {}

  get asyncLocalStorage() {
    return this.als;
  }

  getState() {
    return this.als.getStore();
  }
}
