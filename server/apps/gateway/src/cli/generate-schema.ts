import { composeAndValidate, normalizeTypeDefs } from '@apollo/federation';
import assert from 'assert';
import { readFile, writeFile } from 'fs/promises';
import { parse, printSchema } from 'graphql';

assert(
  process.env.SUBGRAPHS,
  'SUBGRAPHS env variable should be set with format of name:graph1,name:graph2,...',
);

async function generateSchema() {
  const subGraphPaths = String(process.env.SUBGRAPHS)
    .split(',')
    .map((nameNPath) => ({
      name: nameNPath.split(':')[0],
      path: nameNPath.split(':')[1],
    }));

  const subgraphs = await Promise.all(
    subGraphPaths.map(({ name, path }) =>
      readFile(path, 'utf-8')
        .then((buffer) => buffer.toString())
        .then((typeDefsRaw) => ({
          name,
          typeDefs: normalizeTypeDefs(parse(typeDefsRaw)),
        })),
    ),
  );

  const { schema } = composeAndValidate(subgraphs);

  await writeFile('schema.gql', printSchema(schema));
}

generateSchema();
