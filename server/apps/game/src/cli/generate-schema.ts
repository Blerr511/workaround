import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';

import { GraphqlSchemaModule } from './graphql-schema.module';
import { join } from 'path';
import { writeFile } from 'fs/promises';

async function generateSchema() {
  const app = await NestFactory.createApplicationContext(GraphqlSchemaModule);
  const { schema } = app.get(GraphQLSchemaHost);

  await writeFile(
    join(__dirname, '..', '..', 'schema.gql'),
    printSchema(schema as any),
  );

  await app.close();
}

generateSchema().then(() => {
  process.exit(0);
});
