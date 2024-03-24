import { CodegenConfig, executeCodegen } from "@graphql-codegen/cli";
import { readFileSync } from "fs";
import { resolve } from "path";

if (!process.env.SCHEMA_PATH)
  throw new Error("SCHEMA_PATH env variable not found in env");

if (!process.env.OUTPUT) throw new Error("OUTPUT path not found in env");

const schemaPath = process.env.SCHEMA_PATH;
const absoluteSchemaPath = schemaPath

console.log(`Reading schema from ${absoluteSchemaPath}`);

// const schema: GraphQLSchema = buildSchema(

// const config = {
//   documents: [],
//   config: {},
//   // used by a plugin internally, although the 'typescript' plugin currently
//   // returns the string output, rather than writing to a file
//   filename: process.env.OUTPUT,
//   // schema: parse(printSchema(schema)),
//   plugins: [
//     // Each plugin should be an object

//     {
//       "typescript-react-apollo": {
//         withHooks: true,
//         reactApolloVersion: 3,
//         useTypeImports: true,
//       },
//     },
//     {
//       "typescript-operations": {},
//     },
//     {
//       typescript: {}, // Here you can pass configuration to the plugin
//     },
//   ],
//   pluginMap: {
//     typescript: typescriptPlugin,
//     "typescript-react-apollo": reactApolloPlugin,
//     "typescript-operations": typescriptOperationsPlugin,
//   },
// };

// const generate = async () => {
//   const output = await codegen(config);

//   const workspaceDir = process.env.BUILD_WORKSPACE_DIRECTORY;

//   const packagePath = process.env.JS_BINARY__PACKAGE;

//   writeFileSync(join(workspaceDir, packagePath, config.filename), output);
// };

// generate();

const c: CodegenConfig = {
  schema: readFileSync(absoluteSchemaPath, "utf8"),
  generates: {
    "./generated-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withComponent: true,
        withHooks: true,
      },
    },
  },
};

const gen = async () => {
  const r = await executeCodegen(c);

  console.log(r);
};

gen();
