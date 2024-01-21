import { DynamicModule, Module, ValueProvider } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Module({})
export class GcpStorageModule {
  static forRoot(): DynamicModule {
    const clientProvider: ValueProvider = {
      provide: Storage,
      useValue: new Storage(),
    };

    return {
      module: GcpStorageModule,
      exports: [clientProvider],
      providers: [clientProvider],
    };
  }
}
