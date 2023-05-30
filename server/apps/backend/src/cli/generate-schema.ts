import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';

import { AppModule } from '../modules/app.module';

async function generateSchema() {
  AppModule.prototype.onApplicationBootstrap = async () => {
    // Prevent database connection
  };
  const app = await NestFactory.createApplicationContext(AppModule, {});

  const { schema } = app.get(GraphQLSchemaHost);

  writeFileSync('schema.gql', printSchema(schema));

  await app.close();
}

generateSchema();
