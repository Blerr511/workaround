import { Module } from '@nestjs/common';

import {
  INTERNAL_MODULES,
  MODULE_CONFIG,
  MODULE_GRAPHQL,
} from '../modules/modules';

@Module({
  imports: [MODULE_CONFIG, MODULE_GRAPHQL, ...INTERNAL_MODULES],
})
export class GraphqlSchemaModule {}
