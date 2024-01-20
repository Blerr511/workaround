import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';

import { AppModule } from '../app.module';

async function generateSchema() {
  const app = await NestFactory.createApplicationContext(AppModule, {});

  const { schema } = app.get(GraphQLSchemaHost);

  writeFileSync('schema.gql', printSchema(schema));

  await app.close();
}

generateSchema();
