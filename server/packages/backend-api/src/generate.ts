import { CodegenConfig, executeCodegen } from "@graphql-codegen/cli";
import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { resolve } from "path";

if (!process.env.SCHEMA_PATH)
  throw new Error("SCHEMA_PATH env variable not found in env");

if (!process.env.OPERATIONS)
  throw new Error("OPERATIONS env variable not found in env");

if (!process.env.OUTPUT) throw new Error("OUTPUT path not found in env");

const schemaPath = process.env.SCHEMA_PATH;

const operationsPath = process.env.OPERATIONS;

const output = process.env.OUTPUT;

console.log(
  `Reading schema from ${schemaPath}, operations from: ${operationsPath}`
);

const config: CodegenConfig = {
  schema: readFileSync(schemaPath, "utf-8"),
  documents: operationsPath,
  generates: {
    [output]: {
      plugins: [
        "typescript",
        "typescript-operations",
        { "typescript-react-apollo": { withHooks: true } },
        "typescript-apollo-client-helpers",
      ],
    },
  },
};

const gen = async () => {
  const result = await executeCodegen(config);

  await Promise.all(
    result.map((result) =>
      writeFile(result.filename, '"use client"\n' + result.content)
    )
  );

  console.log("Generation completed");
};

gen();
