import { Module } from '@nestjs/common';

import {
  INTERNAL_MODULES,
  MODULE_CONFIG,
  MODULE_GRAPHQL,
} from '../modules/modules';
import { PrismaClient, PrismaModule } from '@wr/data-source';

@Module({
  imports: [
    {
      module: PrismaModule,
      providers: [
        {
          provide: PrismaClient,
          useValue: {},
        },
      ],
      exports: [
        {
          provide: PrismaClient,
          useValue: {},
        },
      ],
      global: true,
    },
    MODULE_CONFIG,
    MODULE_GRAPHQL,
    ...INTERNAL_MODULES,
  ],
})
export class GraphqlSchemaModule {}
