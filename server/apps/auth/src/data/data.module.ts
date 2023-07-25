import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

@Module({})
export class DataModule {
  static forFeature(...dao: Type[]): DynamicModule {
    return {
      imports: [TypeOrmModule.forFeature(entities)],
      module: DataModule,
      exports: dao,
      providers: dao,
    };
  }
}
