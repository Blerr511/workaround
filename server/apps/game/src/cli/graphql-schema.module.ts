import { Module } from '@nestjs/common';

import { MODULE_CONFIG, MODULE_GRAPHQL } from '../modules/modules';

@Module({
  imports: [MODULE_CONFIG, MODULE_GRAPHQL],
})
export class GraphqlSchemaModule {}
