import { DataSource } from 'typeorm';

console.log(__dirname);

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  schema: process.env.POSTGRES_SCHEMA,
  database: process.env.POSTGRES_DATABASE,
  entities: ['**/*.entity{.ts,.js}'],
});
