import { Module } from '@nestjs/common';
import { GameEnterPrismaAdapter } from './game-enter-adapter';
import { TablePrismaDataSource } from './table-data-source';

@Module({
  exports: [GameEnterPrismaAdapter, TablePrismaDataSource],
  providers: [GameEnterPrismaAdapter, TablePrismaDataSource],
})
export class GameAdapterModule {}
