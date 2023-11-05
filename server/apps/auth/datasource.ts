import { DataSource } from 'typeorm';

function extractConfig(connectionString) {
  // Parse the connection string using a regular expression
  const regex =
    /^postgresql:\/\/([^:]+):([^@]+)@([^:]+):([^\/]+)\/([^?]+)(?:\?schema=(.+))?$/;
  const match = connectionString.match(regex);

  if (match) {
    // Extract and return the configuration details
    const [, user, password, host, port, database, schema] = match;
    return {
      host,
      port,
      user,
      password,
      database,
      schema,
    };
  } else {
    // If the string doesn't match the expected format, throw an error
    throw new Error('Invalid connection string');
  }
}

if (process.env.DATA_SOURCE_POSTGRES_URL) {
  const { host, password, port, user, database, schema } = extractConfig(
    process.env.DATA_SOURCE_POSTGRES_URL,
  );

  process.env.POSTGRES_HOST = host;
  process.env.POSTGRES_PORT = port;
  process.env.POSTGRES_PASSWORD = password;
  process.env.POSTGRES_USERNAME = user;
  process.env.POSTGRES_DATABASE = database;

  process.env.POSTGRES_SCHEMA = schema;
}

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(String(process.env.POSTGRES_PORT)),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  schema: process.env.POSTGRES_SCHEMA,
  database: process.env.POSTGRES_DATABASE,
  ssl: { rejectUnauthorized: false },
  entities: ['**/*.entity{.ts,.js}'],
  migrations: ['server/apps/auth/migrations/*{.ts,.js}'],
});
