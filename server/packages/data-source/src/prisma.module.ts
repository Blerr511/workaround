// import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PrismaClient } from "../prisma/prisma-client";
import { createSoftDeleteMiddleware } from "prisma-soft-delete-middleware";

export interface PrismaModuleOptions {
  client: PrismaClient;
}

// @Module({})
export class PrismaModule {
  static async forRootAsync(options?: PrismaModuleOptions): Promise<any> {
    const client = options?.client || new PrismaClient();

    const providers: any[] = [
      {
        provide: PrismaClient,
        useValue: client,
      },
    ];

    client.$use(
      createSoftDeleteMiddleware({
        models: {
          Upload: true,
        },
        defaultConfig: {
          field: "deletedAt",
          createValue: (deleted) => {
            if (deleted) return new Date();
            return null;
          },
        },
      })
    );

    return {
      module: PrismaModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
