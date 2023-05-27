import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { PrismaClient } from '../prisma/prisma-client';

export interface PrismaModuleOptions {
  client: PrismaClient;
}

@Module({})
export class PrismaModule {
  static async forRootAsync(
    options?: PrismaModuleOptions
  ): Promise<DynamicModule> {
    const client = options?.client || new PrismaClient();

    await client.$connect();

    const providers: Provider[] = [
      {
        provide: PrismaClient,
        useValue: client,
      },
    ];

    return {
      module: PrismaModule,
      providers,
      exports: providers,
      global: true,
    };
  }

  static forDao(daoList: Type[]): DynamicModule {
    const providers: Provider[] = daoList.map((daoCls) => ({
      provide: daoCls,
      useClass: daoCls,
    }));

    return {
      module: PrismaModule,
      providers: providers,
      exports: providers,
    };
  }
}
