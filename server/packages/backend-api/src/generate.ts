import { buildSchema, printSchema, parse, GraphQLSchema } from "graphql";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import { readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { codegen } from "@graphql-codegen/core";

if (!process.env.SCHEMA_PATH)
  throw new Error("SCHEMA_PATH env variable not found in env");

if (!process.env.OUTPUT) throw new Error("OUTPUT path not found in env");

const schemaPath = process.env.SCHEMA_PATH;
const absoluteSchemaPath = resolve(
  process.cwd(),
  "server/apps/backend/schema.gql"
);

console.log(`Reading schema from ${schemaPath}`);

const schema: GraphQLSchema = buildSchema(
  readFileSync(absoluteSchemaPath, "utf8")
);

const config = {
  documents: [],
  config: {},
  // used by a plugin internally, although the 'typescript' plugin currently
  // returns the string output, rather than writing to a file
  filename: process.env.OUTPUT,
  schema: parse(printSchema(schema)),
  plugins: [
    // Each plugin should be an object
    {
      typescript: {}, // Here you can pass configuration to the plugin
      "typescript-operations": {},
      "typescript-react-apollo": {},
    },
  ],
  pluginMap: {
    typescript: typescriptPlugin,
  },
};

const generate = async () => {
  const output = await codegen(config);

  const workspaceDir = process.env.BUILD_WORKSPACE_DIRECTORY;

  const packagePath = process.env.JS_BINARY__PACKAGE;

  writeFileSync(join(workspaceDir, packagePath, config.filename), output);
};

generate();
