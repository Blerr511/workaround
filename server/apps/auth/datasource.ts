import { DataSource } from 'typeorm';

function extractConfig(connectionString) {
  const regex = /^postgresql:\/\/([^:]+):([^@]+)@([^:]+):([^/]+)\/(.+)$/;
  const match = connectionString.match(regex);

  if (match) {
    const [, user, password, host, port, database] = match;
    return {
      host,
      port,
      user,
      password,
      database,
    };
  } else {
    throw new Error('Invalid connection string');
  }
}

if (process.env.DATA_SOURCE_POSTGRES_URL) {
  const { host, password, port, user, database } = extractConfig(
    process.env.DATA_SOURCE_POSTGRES_URL,
  );

  process.env.POSTGRES_HOST = host;
  process.env.POSTGRES_PORT = port;
  process.env.POSTGRES_PASSWORD = password;
  process.env.POSTGRES_USERNAME = user;
  process.env.POSTGRES_DATABASE = database;

  if (!process.env.POSTGRES_SCHEMA) process.env.POSTGRES_SCHEMA = 'public';
}

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(String(process.env.POSTGRES_PORT)),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  schema: process.env.POSTGRES_SCHEMA,
  database: process.env.POSTGRES_DATABASE,
  entities: ['**/*.entity{.ts,.js}'],
  migrations: ['server/apps/auth/migrations/*{.ts,.js}'],
});
