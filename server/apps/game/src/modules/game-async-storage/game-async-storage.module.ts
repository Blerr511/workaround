import { Global, Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { GameAsyncStorageService } from './game-async-storage.service';

@Global()
@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
    GameAsyncStorageService,
  ],
  exports: [GameAsyncStorageService],
})
export class GameAsyncStorageModule {}
